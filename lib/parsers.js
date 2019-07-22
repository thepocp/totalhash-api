const parseXml = require('xml2js').parseString;

const convertToObj = async (data) => {
  return new Promise((resolve, reject) =>
    parseXml(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
};

const formatDoc = (doc) => {
  if (!doc) {
    return [];
  }

  return Array.isArray(doc)
    ? doc.map(({ str }) => ({ [str.name]: str._ }))
    : [{ [doc.str.name]: doc.str._ }];
};

const parseSearchResult = async (data) => {
  const parsed = await convertToObj(data);

  const { numFound, start, doc } = parsed.response.result;
  return { numFound: +numFound, start: +start, doc: formatDoc(doc) };
};

const parseAnalysisResult = async (data) => {
  if (!data) {
    return data;
  }

  const getArray = (obj) => {
    if (!obj) {
      return null;
    }

    return Array.isArray(obj) ? obj : [obj];
  };

  const parsed = await convertToObj(data);
  const processes = parsed.analysis.processes;
  const static = parsed.analysis.static;

  return {
    ...parsed.analysis,
    processes: processes
      ? {
          scr_shot_md5: processes.scr_shot_md5,
          scr_shot_sha1: processes.scr_shot_sha1,
          processes: getArray(processes.process).map((process) => ({
            ...process,
            mutex_section: process.mutex_section
              ? {
                  create_mutex: getArray(process.mutex_section.create_mutex),
                }
              : null,
            process_section: process.process_section
              ? {
                  create_process: getArray(process.process_section.create_process),
                  open_process: getArray(process.process_section.open_process),
                }
              : null,
            registry_section: process.registry_section
              ? {
                  set_value: getArray(process.registry_section.set_value),
                }
              : null,

            filesystem_section: process.filesystem_section
              ? {
                  create_file: getArray(process.filesystem_section.create_file),
                  delete_file: getArray(process.filesystem_section.delete_file),
                }
              : null,
            dll_handling_section: process.dll_handling_section
              ? {
                  load_dll: getArray(process.dll_handling_section.load_dll),
                }
              : null,
            windows_hook_section: process.windows_hook_section
              ? {
                  set_windows_hook: getArray(process.windows_hook_section.set_windows_hook),
                }
              : null,
          })),
        }
      : null,
    running_processes: getArray(parsed.analysis.running_processes),
    static: static
      ? {
          ...static,
          section: getArray(static.section),
          imports: getArray(static.imports),
          av: getArray(static.av),
        }
      : null,
  };
};

module.exports = { parseSearchResult, parseAnalysisResult };
