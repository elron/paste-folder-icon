
// Set settings
LPSHFOLDERCUSTOMSETTINGS FolderCustomSettings = new LPSHFOLDERCUSTOMSETTINGS
{
    dwMask = FCSM_ICONFILE,
    pszIconFile = null,
    cchIconFile = 0,
    iIconIndex = 0
};

// Set default icon
UInt32 HRESULT = SHGetSetFolderCustomSettings(ref FolderCustomSettings, subdirectory, FCS_FORCEWRITE);