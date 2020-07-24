jest.mock('node-fetch');

import fetch from 'node-fetch';
import { totalhash } from '../src/index';

describe('api.search()', () => {
  it('Works correctly with one found hash', async () => {
    (fetch as any).mockReturnValue(
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(`
      <?xml version="1.0"?>
      <!-- Totalhash sandbox copyright (c) 2013 -->
      <analysis version="0.3" sha1="42493f2b568826215a85529a238dfdddf57a6868" md5="4a70999f7a8fe02a508367d95251504b" time="2013-12-18 20:11:39">
        <static strings_sha1="93ad0ecf5ae66021836f9e57602aa4c56484cc18" strings_md5="c11005555398a49b210a2b69b4318556">
          <magic value="PE32 executable for MS Windows (GUI) Intel 80386 32-bit"/>
          <section name=".text" md5="56b7e1ff01348cacea6debcf4913e0dc" sha1="8a5f9049e2c998a2869fcbb4653a9c273b3373dd" size="69632"/>
          <section name=".rdata" md5="f304b89c02747b9daeb82d1f01e05594" sha1="5ea5061796b79c9db5971f102ee41035cc0a4a80" size="16384"/>
          <section name=".data" md5="51bf5d48b8470f2193cbde1987527147" sha1="5c65e4253f163f92f8dc64342e80f5056d5c6301" size="8192"/>
          <section name=".rsrc" md5="3e0e84c8d2d5b51eba56b2e2388b557c" sha1="16232ea1bb4818aca1a5b6e6bb6622116476c3b5" size="69632"/>
          <imports dll="kernel32.dll"/>
          <imports dll="advapi32.dll"/>
          <imports dll="user32.dll"/>
          <pehash value="9819b9efb7e5c7573f0c7d461a85958a8339993a"/>
          <pdb value="d:\\views_new\\o00155458_CPM_inactive\\SPESSCA_DEV_VOB\\CLIENT\\Composites\\Cpm\\Output\\Release\\Unpack.pdb"/>
          <timestamp value="2012-11-26 07:03:40"/>
          <packer value="Microsoft Visual C++ 7.0"/>
          <av scanner="avg" timestamp="2013-12-18 20:11:39" signature="Win32/DH{A2cAWGg1}"/>
        </static>
        <calltree>
          <process_call index="1" filename="C:\\malware.exe" pid="1532" startreason="AnalysisTarget"/>
          <process_call index="2" pid="1072" filename="Setup.exe "/>
        </calltree>
        <processes scr_shot_sha1="94110c49b16ad149cc82fe4dad824a6462d163dc" scr_shot_md5="c0f7a82dc2caafc1b2618b8d7619bbc0">
          <process index="1" pid="1532" filename="C:\\malware.exe" executionstatus="OK">
            <dll_handling_section>
              <load_dll filename="kernel32.dll"/>
              <load_dll filename="kernel32"/>
            </dll_handling_section>
            <filesystem_section>
              <create_file filetype="file" srcfile="cpmcode.lnk"/>
              <create_file filetype="file" srcfile="CDRomFlt.sys"/>
              <create_file filetype="file" srcfile="core.dll"/>
              <create_file filetype="file" srcfile="C:\\WINDOWS\\jsjdkkz.tmp"/>
              <create_file filetype="file" srcfile="Setup.exe"/>
              <create_file filetype="file" srcfile="CpmTray.exe"/>
              <create_file filetype="file" srcfile="FsCrypt.sys"/>
              <create_file filetype="file" srcfile="huaweica.pem"/>
              <create_file filetype="file" srcfile="ui.dll"/>
              <create_file filetype="file" srcfile="WLanFunc.dll"/>
              <create_file filetype="file" srcfile="cpm.cfg"/>
            </filesystem_section>
            <process_section>
              <create_process targetpid="1072" cmdline="Setup.exe " apifunction="CreateProcessInternal"/>
            </process_section>
            <mutex_section>
              <create_mutex name="ToyStackWalkLock_1532"/>
            </mutex_section>
          </process>
          <process index="2" pid="1072" filename="Setup.exe ">
            <dll_handling_section>
              <load_dll filename="version.dll"/>
              <load_dll filename="kernel32.dll"/>
              <load_dll filename="c:\\windows\\system32\\msctfime.ime"/>
              <load_dll filename="c:\\windows\\system32\\ntdll.dll"/>
              <load_dll filename="kernel32"/>
            </dll_handling_section>
            <filesystem_section>
              <create_file filetype="file" srcfile="C:\\Program Files\\Common Files\\Microsoft Shared\\SysDiag\\test.xml"/>
              <create_file filetype="file" srcfile="C:\\WINDOWS\\system32\\LogConfig.ini"/>
              <delete_file filetype="file" srcfile="C:\\Program Files\\Common Files\\Microsoft Shared\\SysDiag\\test.xml"/>
            </filesystem_section>
            <mutex_section>
              <create_mutex name="GLOBALLOGMUTEXNAME_SysDiag"/>
              <create_mutex name="ToyStackWalkLock_1072"/>
            </mutex_section>
          </process>
        </processes>
        <running_processes>
          <running_process pid="0" filename="[System Process]" ppid="0"/>
          <running_process pid="4" filename="System" ppid="0"/>
          <running_process pid="492" filename="smss.exe" ppid="4"/>
          <running_process pid="548" filename="csrss.exe" ppid="492"/>
          <running_process pid="572" filename="winlogon.exe" ppid="492"/>
          <running_process pid="616" filename="services.exe" ppid="572"/>
          <running_process pid="628" filename="lsass.exe" ppid="572"/>
          <running_process pid="784" filename="svchost.exe" ppid="616"/>
          <running_process pid="844" filename="svchost.exe" ppid="616"/>
          <running_process pid="1012" filename="svchost.exe" ppid="616"/>
          <running_process pid="1088" filename="svchost.exe" ppid="616"/>
          <running_process pid="1248" filename="svchost.exe" ppid="616"/>
          <running_process pid="1352" filename="spoolsv.exe" ppid="616"/>
          <running_process pid="1860" filename="alg.exe" ppid="616"/>
          <running_process pid="224" filename="userinit.exe" ppid="572"/>
          <running_process pid="268" filename="explorer.exe" ppid="224"/>
          <running_process pid="944" filename="reader_sl.exe" ppid="268"/>
          <running_process pid="1160" filename="svchost.exe" ppid="616"/>
          <running_process pid="1136" filename="monitor.exe" ppid="1160"/>
          <running_process pid="1532" filename="malware.exe" ppid="1136"/>
          <running_process pid="1072" filename="Setup.exe" ppid="1532"/>
        </running_processes>
        <network_pcap sha1="de67c18d7c767c1ba3b48caa6f3047e1b1749c1a" md5="40ce6b88f06ae04aeee72b961bd6844c"/>
      </analysis>        
      `),
      }),
    );

    const api = totalhash('id', 'api_key');
    const result = await api.analysis(
      '42493f2b568826215a85529a238dfdddf57a6868',
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      version: '0.3',
      sha1: '42493f2b568826215a85529a238dfdddf57a6868',
      md5: '4a70999f7a8fe02a508367d95251504b',
      time: '2013-12-18 20:11:39',
      static: {
        strings_sha1: '93ad0ecf5ae66021836f9e57602aa4c56484cc18',
        strings_md5: 'c11005555398a49b210a2b69b4318556',
        magic: {
          value: 'PE32 executable for MS Windows (GUI) Intel 80386 32-bit',
        },
        section: [
          {
            name: '.text',
            md5: '56b7e1ff01348cacea6debcf4913e0dc',
            sha1: '8a5f9049e2c998a2869fcbb4653a9c273b3373dd',
            size: '69632',
          },
          {
            name: '.rdata',
            md5: 'f304b89c02747b9daeb82d1f01e05594',
            sha1: '5ea5061796b79c9db5971f102ee41035cc0a4a80',
            size: '16384',
          },
          {
            name: '.data',
            md5: '51bf5d48b8470f2193cbde1987527147',
            sha1: '5c65e4253f163f92f8dc64342e80f5056d5c6301',
            size: '8192',
          },
          {
            name: '.rsrc',
            md5: '3e0e84c8d2d5b51eba56b2e2388b557c',
            sha1: '16232ea1bb4818aca1a5b6e6bb6622116476c3b5',
            size: '69632',
          },
        ],
        imports: [
          { dll: 'kernel32.dll' },
          { dll: 'advapi32.dll' },
          { dll: 'user32.dll' },
        ],
        pehash: { value: '9819b9efb7e5c7573f0c7d461a85958a8339993a' },
        pdb: {
          value:
            'd:\\views_new\\o00155458_CPM_inactive\\SPESSCA_DEV_VOB\\CLIENT\\Composites\\Cpm\\Output\\Release\\Unpack.pdb',
        },
        timestamp: { value: '2012-11-26 07:03:40' },
        packer: { value: 'Microsoft Visual C++ 7.0' },
        av: [
          {
            scanner: 'avg',
            timestamp: '2013-12-18 20:11:39',
            signature: 'Win32/DH{A2cAWGg1}',
          },
        ],
      },
      calltree: {
        process_call: [
          {
            index: '1',
            filename: 'C:\\malware.exe',
            pid: '1532',
            startreason: 'AnalysisTarget',
          },
          { index: '2', pid: '1072', filename: 'Setup.exe ' },
        ],
      },
      processes: {
        scr_shot_md5: 'c0f7a82dc2caafc1b2618b8d7619bbc0',
        scr_shot_sha1: '94110c49b16ad149cc82fe4dad824a6462d163dc',
        processes: [
          {
            index: '1',
            pid: '1532',
            filename: 'C:\\malware.exe',
            executionstatus: 'OK',
            dll_handling_section: {
              load_dll: [
                { filename: 'kernel32.dll' },
                { filename: 'kernel32' },
              ],
            },
            filesystem_section: {
              create_file: [
                { filetype: 'file', srcfile: 'cpmcode.lnk' },
                { filetype: 'file', srcfile: 'CDRomFlt.sys' },
                { filetype: 'file', srcfile: 'core.dll' },
                { filetype: 'file', srcfile: 'C:\\WINDOWS\\jsjdkkz.tmp' },
                { filetype: 'file', srcfile: 'Setup.exe' },
                { filetype: 'file', srcfile: 'CpmTray.exe' },
                { filetype: 'file', srcfile: 'FsCrypt.sys' },
                { filetype: 'file', srcfile: 'huaweica.pem' },
                { filetype: 'file', srcfile: 'ui.dll' },
                { filetype: 'file', srcfile: 'WLanFunc.dll' },
                { filetype: 'file', srcfile: 'cpm.cfg' },
              ],
              delete_file: null,
            },
            process_section: {
              create_process: [
                {
                  targetpid: '1072',
                  cmdline: 'Setup.exe ',
                  apifunction: 'CreateProcessInternal',
                },
              ],
              open_process: null,
            },
            mutex_section: {
              create_mutex: [{ name: 'ToyStackWalkLock_1532' }],
            },
            registry_section: null,
            windows_hook_section: null,
          },
          {
            index: '2',
            pid: '1072',
            filename: 'Setup.exe ',
            dll_handling_section: {
              load_dll: [
                { filename: 'version.dll' },
                { filename: 'kernel32.dll' },
                { filename: 'c:\\windows\\system32\\msctfime.ime' },
                { filename: 'c:\\windows\\system32\\ntdll.dll' },
                { filename: 'kernel32' },
              ],
            },
            filesystem_section: {
              create_file: [
                {
                  filetype: 'file',
                  srcfile:
                    'C:\\Program Files\\Common Files\\Microsoft Shared\\SysDiag\\test.xml',
                },
                {
                  filetype: 'file',
                  srcfile: 'C:\\WINDOWS\\system32\\LogConfig.ini',
                },
              ],
              delete_file: [
                {
                  filetype: 'file',
                  srcfile:
                    'C:\\Program Files\\Common Files\\Microsoft Shared\\SysDiag\\test.xml',
                },
              ],
            },
            mutex_section: {
              create_mutex: [
                { name: 'GLOBALLOGMUTEXNAME_SysDiag' },
                { name: 'ToyStackWalkLock_1072' },
              ],
            },
            process_section: null,
            registry_section: null,
            windows_hook_section: null,
          },
        ],
      },
      running_processes: [
        {
          running_process: [
            { pid: '0', filename: '[System Process]', ppid: '0' },
            { pid: '4', filename: 'System', ppid: '0' },
            { pid: '492', filename: 'smss.exe', ppid: '4' },
            { pid: '548', filename: 'csrss.exe', ppid: '492' },
            { pid: '572', filename: 'winlogon.exe', ppid: '492' },
            { pid: '616', filename: 'services.exe', ppid: '572' },
            { pid: '628', filename: 'lsass.exe', ppid: '572' },
            { pid: '784', filename: 'svchost.exe', ppid: '616' },
            { pid: '844', filename: 'svchost.exe', ppid: '616' },
            { pid: '1012', filename: 'svchost.exe', ppid: '616' },
            { pid: '1088', filename: 'svchost.exe', ppid: '616' },
            { pid: '1248', filename: 'svchost.exe', ppid: '616' },
            { pid: '1352', filename: 'spoolsv.exe', ppid: '616' },
            { pid: '1860', filename: 'alg.exe', ppid: '616' },
            { pid: '224', filename: 'userinit.exe', ppid: '572' },
            { pid: '268', filename: 'explorer.exe', ppid: '224' },
            { pid: '944', filename: 'reader_sl.exe', ppid: '268' },
            { pid: '1160', filename: 'svchost.exe', ppid: '616' },
            { pid: '1136', filename: 'monitor.exe', ppid: '1160' },
            { pid: '1532', filename: 'malware.exe', ppid: '1136' },
            { pid: '1072', filename: 'Setup.exe', ppid: '1532' },
          ],
        },
      ],
      network_pcap: {
        sha1: 'de67c18d7c767c1ba3b48caa6f3047e1b1749c1a',
        md5: '40ce6b88f06ae04aeee72b961bd6844c',
        dns: null,
        flows: null,
      },
    });
  });
});
