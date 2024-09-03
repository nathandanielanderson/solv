import DEFAULT_CONFIG from '@/config/defaultConfig'
import {
  LANG,
  LANGS,
  Network,
  NETWORK_TYPES,
  NODE_TYPES,
  NodeType,
  RPC_MODE,
  RpcType,
  SOLANA_CLIENTS,
  ValidatorType,
} from '@/config/enums'
import { updateDefaultConfig } from '@/config/updateDefaultConfig'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { askJitoSetting } from '../askJitoSetting'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'

type SolvInitialConfig = {
  lang: LANG
  network: Network
  nodeType: NodeType
}

// Setup initial config in solv4.config.json
const initialConfigSetup = async () => {
  try {
    // Setup solv config
    let validatorType: ValidatorType = ValidatorType.NONE
    let rpcType: RpcType = RpcType.AGAVE
    let commission = DEFAULT_CONFIG.COMMISSION
    let isDummy = false
    const answer = await inquirer.prompt<SolvInitialConfig>([
      {
        name: 'lang',
        type: 'list',
        message: 'Choose Language',
        choices: LANGS,
        default: LANG.EN,
      },
      {
        name: 'network',
        type: 'list',
        message: 'Choose Network',
        choices: NETWORK_TYPES,
        default: Network.MAINNET,
      },
      {
        name: 'nodeType',
        type: 'list',
        message: 'Choose Node Type',
        choices: NODE_TYPES,
        default: NodeType.RPC,
      },
    ])
    if (answer.nodeType === NodeType.VALIDATOR) {
      validatorType = await inquirer
        .prompt<{ validatorType: ValidatorType }>({
          name: 'validatorType',
          type: 'list',
          message: 'Choose Validator Type',
          choices: SOLANA_CLIENTS,
          default: ValidatorType.AGAVE,
        })
        .then((answer) => answer.validatorType)
      rpcType = RpcType.NONE
    }
    if (answer.nodeType === NodeType.RPC) {
      rpcType = await inquirer
        .prompt<{ rpcType: RpcType }>({
          name: 'rpcType',
          type: 'list',
          message: 'Choose RPC Type',
          choices: RPC_MODE,
          default: RpcType.AGAVE,
        })
        .then((answer) => answer.rpcType)
    }

    if (answer.nodeType === NodeType.VALIDATOR) {
      const answer = await inquirer.prompt<{
        commission: number
        isDummy: boolean
      }>([
        {
          name: 'commission',
          type: 'number',
          message:
            'What is your commission rate? You can change it later (default: 10%)',
          default: DEFAULT_CONFIG.COMMISSION,
        },
        {
          name: 'isDummy',
          type: 'confirm',
          message:
            'Do you want to setup as a dummy(Inactive) node?(※For Migration)',
          default: true,
        },
      ])
      commission = answer.commission
      isDummy = answer.isDummy
      if (validatorType === ValidatorType.JITO) {
        await readOrCreateJitoConfig()
        const jitoConfig = await askJitoSetting()
        await updateJitoSolvConfig(jitoConfig)
      }
    }

    const { lang, network, nodeType } = answer
    console.log(chalk.white('Language:', lang))
    console.log(chalk.white('Network:', network))
    console.log(chalk.white('Node Type:', nodeType))
    console.log(chalk.white('Validator Type:', validatorType))
    console.log(chalk.white('RPC Type:', rpcType))
    if (nodeType === NodeType.VALIDATOR) {
      console.log(chalk.white('Commission:', commission))
    }
    await updateDefaultConfig({
      LANG: lang,
      NETWORK: network,
      NODE_TYPE: nodeType,
      VALIDATOR_TYPE: validatorType,
      RPC_TYPE: rpcType,
      COMMISSION: commission,
      IS_DUMMY: isDummy,
    })
    return true
  } catch (error: any) {
    if (error.message.includes('User force closed the prompt')) {
      console.error(chalk.cyan(`Exiting...🌛`))
      return false
    }
    console.error(chalk.red(`Switch Error: ${error.message}`))
    return false
  }
}

export default initialConfigSetup
