//VM Liste, die als Schnittstelle für SRE gilt (im Realfall müsste diese mit den Maschinen ausgelagert werden)
const vm_info = [
  //['name','--','password','tooltip1','',vmsize_in_mb]
    ['Windows 98','Trevor','password','Windows 98','',100],
    ['HAL91', '--','--','HAL91 UNIX (1998)','',2],
    ['Windows ME','Trevor','password','Windows Millenium','',305],
    ['OpenBSD 6.5 (Fvwm)','root','BSDtoor','OpenBSD (Mauszeigerintegration eingeschränkt','',553],
    ['OPENSTEP 4.2','--','','tooltip1','',133],
    ['OS2 1.30 (Microsoft)','--','','IBM OS/2 1.30.1 (1991)','',6],
    ['ubuntu-8.04-x86','ubuntu','reverse','Ubuntu 8.04 (2008)','',840],
    ['OS2-W4','--','','IBM OS/2 4 Warp','',95],
    ['ReactOS 0.4.9','--','--','React OS 0.4.9 (2018)','',178],
    ['sol-11_4-vbox','root','admin1','Oracle Solaris 11','',3450],
    ['TrueOS 18.12 stable (Mate)','root','TRUEtoor','True OS 18.12 (Mauszeigerintegration eingeschränkt)','',3650],
    ['Unix System V R4','--','--','AT&T Unix System V R4 (1983)','',14],
    ['Win NT 3.51','Administrator','admin','WIN NT 3.51 (Mauszeigerintegration eingeschränkt)','',26],
    ['Win NT 4 (clean)','Administrator','admin','WIN NT 4 (VNC-Remote (nicht Web-VNC) empfohlen)','',340],
    ['WIN3.1 (SND, SVGA, NET)','Administrator','admin','WIN3.1','',12],
    ['Xenix 386 2.3.4q','--','nicht bekannt','XENIS 386 (Passwort unbekannt)','',8],
    ['CPM-86 1.1','--','--','CPM-86 1.1','',1],
    ['DilOS','root','DILOStoor','DilOS','',765],
    ['DOS_2.10','--','--','DOS 2.10','',1],
    ['DOS_3.30 Win2','--','--','DOS 3.30 Win2 Mauszeigerintegration eingeschränkt','',2],
    ['DOS_622-Win311','--','--','DOS 622 Win311','Nach Start: win eingeben, um Windows zu starten.',45],
    ['DR-DOS8','--','--','DR-DOS8','',3],
];

export default vm_info;
