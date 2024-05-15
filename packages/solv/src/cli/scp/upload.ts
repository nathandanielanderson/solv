import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { readdir } from 'fs/promises'
import inquirer from 'inquirer'
import os from 'os'

export const upload = async () => {
  const homeDirectory = os.userInfo().homedir
  const answer = await inquirer.prompt<{ ip: string }>([
    {
      type: 'input',
      name: 'ip',
      message: 'Enter your Ubuntu Server IP',
      default() {
        return '1.1.1.1'
      },
    },
  ])
  const solanaKeys = Object.values(getAllKeyPaths())

  const uploadPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${uploadPath}/${fileName}`
    if (!existsSync(filePath)) {
      continue
    }
    const cmd = `scp ${filePath} solv@${answer.ip}:${key}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Uploaded - ${fileName} 🎉`)
  }

  // Upload tower file
  const towerPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
  const files = await readdir(towerPath)
  const towerFiles = files.filter((file) => file.startsWith('tower-'))
  const towerFile = towerFiles.map((file) => `${towerPath}/${file}`)
  for (const file of towerFile) {
    const splits = file.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${uploadPath}/${fileName}`
    if (!existsSync(filePath)) {
      continue
    }
    const cmd = `scp ${filePath} solv@${answer.ip}:${file}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Uploaded - ${fileName} 🎉`)
  }
}
