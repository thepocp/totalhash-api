import { parseString } from 'xml2js';

interface DocItem {
  str: { _: string; name: string };
}

interface SearchResult {
  response: {
    result: {
      numFound: string;
      start: string;
      doc?: DocItem | DocItem[];
    };
  };
}

interface Mutex {
  name: string;
}

interface CreatedProcess {
  cmdline?: string;
  targetpid?: string;
  apifunction?: string;
}

interface OpenedProcess {
  targetpid?: string;
  apifunction?: string;
}

interface Registry {
  key?: string;
  value?: string;
}

interface File {
  srcfile?: string;
  filetype?: string;
}

interface Dll {
  filename?: string;
}

interface WindowsHook {
  hookid?: string;
  threadid?: string;
  hook_address?: string;
}

interface Process {
  mutex_section?: {
    create_mutex?: Mutex | Mutex[];
  };
  process_section?: {
    create_process?: CreatedProcess | CreatedProcess[];
    open_process?: OpenedProcess | OpenedProcess[];
  };
  registry_section?: {
    set_value?: Registry | Registry[];
  };
  filesystem_section?: {
    create_file?: File | File[];
    delete_file?: File | File[];
  };
  dll_handling_section?: {
    load_dll?: Dll | Dll[];
  };
  windows_hook_section?: {
    set_windows_hook?: WindowsHook | WindowsHook[];
  };
}

interface RunningProcess {
  pid?: string;
  ppid?: string;
  filename?: string;
}

interface Section {
  md5?: string;
  name?: string;
  sha1?: string;
  size?: string;
}

interface Import {
  dll?: string;
}

interface Av {
  av_product?: string;
  info?: string;
  scanner?: string;
  signature?: string;
  timestamp?: string;
  update?: string;
  version?: string;
}

interface Dns {
  ip?: string;
  rr?: string;
  type?: string;
}

interface Flow {
  bytes?: string;
  dst_ip?: string;
  dst_port?: string;
  protocol?: string;
  src_ip?: string;
  src_port?: string;
}

interface AnalysisResult {
  analysis: {
    processes?: {
      scr_shot_md5: string;
      scr_shot_sha1: string;
      process?: Process | Process[];
    };
    running_processes?: RunningProcess | RunningProcess[];
    static?: {
      section?: Section | Section[];
      imports?: Import | Import[];
      av?: Av | Av[];
    };
    network_pcap?: {
      md5?: string;
      sha1?: string;
      dns?: Dns | Dns[];
      flows?: Flow | Flow[];
    };
  };
}

const LIMITS_EXCEEDED_MESSAGE =
  'Sorry API limit reached please contact totalhash.com@gmail.com';

const checkLimits = (data: string) => data.startsWith(LIMITS_EXCEEDED_MESSAGE);

const convertToObj = async <T extends {}>(data: string): Promise<T> => {
  return new Promise((resolve, reject) =>
    parseString(
      data,
      { mergeAttrs: true, explicitArray: false },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    ),
  );
};

const convertToArray = <T extends {}>(obj?: T | Array<T>) => {
  if (!obj) {
    return null;
  }

  return Array.isArray(obj) ? obj : [obj];
};

const formatDoc = (doc?: DocItem | DocItem[]) => {
  const converted = convertToArray(doc);
  return converted ? converted.map(({ str }) => ({ [str.name]: str._ })) : [];
};

const parseSearchResult = async (data: string) => {
  const limitsExceeded = checkLimits(data);
  if (limitsExceeded) {
    throw new Error(LIMITS_EXCEEDED_MESSAGE);
  }

  const parsed = await convertToObj<SearchResult>(data);

  const { numFound, start, doc } = parsed.response.result;
  return { numFound: +numFound, start: +start, doc: formatDoc(doc) };
};

const parseAnalysisResult = async (data?: string) => {
  if (!data) {
    return null;
  }

  const limitsExceeded = checkLimits(data);
  if (limitsExceeded) {
    throw new Error(LIMITS_EXCEEDED_MESSAGE);
  }

  const parsed = await convertToObj<AnalysisResult>(data);
  const {
    processes,
    static: staticBlock,
    network_pcap: networkPcap,
  } = parsed.analysis;

  const convertedProcesses = processes && convertToArray(processes.process);

  return {
    ...parsed.analysis,
    processes: processes
      ? {
          scr_shot_md5: processes.scr_shot_md5,
          scr_shot_sha1: processes.scr_shot_sha1,
          processes: convertedProcesses
            ? convertedProcesses.map((process) => ({
                ...process,
                mutex_section: process.mutex_section
                  ? {
                      create_mutex: convertToArray(
                        process.mutex_section.create_mutex,
                      ),
                    }
                  : null,
                process_section: process.process_section
                  ? {
                      create_process: convertToArray(
                        process.process_section.create_process,
                      ),
                      open_process: convertToArray(
                        process.process_section.open_process,
                      ),
                    }
                  : null,
                registry_section: process.registry_section
                  ? {
                      set_value: convertToArray(
                        process.registry_section.set_value,
                      ),
                    }
                  : null,

                filesystem_section: process.filesystem_section
                  ? {
                      create_file: convertToArray(
                        process.filesystem_section.create_file,
                      ),
                      delete_file: convertToArray(
                        process.filesystem_section.delete_file,
                      ),
                    }
                  : null,
                dll_handling_section: process.dll_handling_section
                  ? {
                      load_dll: convertToArray(
                        process.dll_handling_section.load_dll,
                      ),
                    }
                  : null,
                windows_hook_section: process.windows_hook_section
                  ? {
                      set_windows_hook: convertToArray(
                        process.windows_hook_section.set_windows_hook,
                      ),
                    }
                  : null,
              }))
            : null,
        }
      : null,
    running_processes: convertToArray(parsed.analysis.running_processes),
    static: staticBlock
      ? {
          ...staticBlock,
          section: convertToArray(staticBlock.section),
          imports: convertToArray(staticBlock.imports),
          av: convertToArray(staticBlock.av),
        }
      : null,
    network_pcap: networkPcap
      ? {
          ...networkPcap,
          dns: convertToArray(networkPcap.dns),
          flows: convertToArray(networkPcap.flows),
        }
      : null,
  };
};

export { parseSearchResult, parseAnalysisResult };
