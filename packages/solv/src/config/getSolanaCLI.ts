import getSolanaVersion from '@/cli/epochTimer/getSolanaVersion'

const SOLANA_CLI = 'solana-validator'
const AGAVE_CLI = 'agave-validator'

export type SolanaCLI = typeof SOLANA_CLI | typeof AGAVE_CLI

const getSolanaCLI = (): SolanaCLI => {
  try {
    const solanaVersion = getSolanaVersion()
    const hasVersion2 = solanaVersion.startsWith('2.')
    if (hasVersion2) {
      return AGAVE_CLI
    }
    return SOLANA_CLI
  } catch (error) {
    console.error(error)
    return SOLANA_CLI
  }
}

export default getSolanaCLI
