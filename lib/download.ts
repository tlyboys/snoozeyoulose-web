export type Platform = 'mac' | 'windows' | 'linux'
export type Arch = 'arm64' | 'x64'

export interface DownloadEntry {
  platform: Platform
  arch: Arch
  ext: string
  url: string
}

// 下载源：GitHub 公开 release 的 latest/download 永久链接根。
// 形如 https://github.com/<owner>/<repo>/releases/latest/download
// 产物名不含版本号 → 永远指向最新 release，游戏发新版时官网无需改动/重新构建。
const BASE = (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ?? '').replace(
  /\/$/,
  '',
)

// 与游戏 electron-builder 的 ASCII 产物名保持一致（均不含版本号）。
const PRODUCT = 'SnoozeYouLose'

// 最新 release 页（去掉末尾 /download），供「最新版本」徽章链接。
export const latestReleaseUrl = BASE.replace(/\/download$/, '')

function fileName(platform: Platform, arch: Arch): string {
  switch (platform) {
    case 'mac':
      return `${PRODUCT}-Mac-${arch}-Installer.dmg`
    case 'windows':
      return `${PRODUCT}-Windows-Setup.exe`
    case 'linux': {
      // electron-builder 的 AppImage 把 x64 命名为 x86_64
      const linuxArch = arch === 'x64' ? 'x86_64' : arch
      return `${PRODUCT}-Linux-${linuxArch}.AppImage`
    }
  }
}

function buildUrl(platform: Platform, arch: Arch): string {
  return `${BASE}/${fileName(platform, arch)}`
}

export const downloads: DownloadEntry[] = [
  { platform: 'mac', arch: 'arm64', ext: 'dmg', url: buildUrl('mac', 'arm64') },
  { platform: 'mac', arch: 'x64', ext: 'dmg', url: buildUrl('mac', 'x64') },
  {
    platform: 'windows',
    arch: 'x64',
    ext: 'exe',
    url: buildUrl('windows', 'x64'),
  },
  {
    platform: 'linux',
    arch: 'x64',
    ext: 'AppImage',
    url: buildUrl('linux', 'x64'),
  },
]
