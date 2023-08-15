'use strict'
var Li = Object.create
var ae = Object.defineProperty
var Ni = Object.getOwnPropertyDescriptor
var ji = Object.getOwnPropertyNames
var Hi = Object.getPrototypeOf,
  Wi = Object.prototype.hasOwnProperty
var F = (i, e) => () => (e || i((e = { exports: {} }).exports, e), e.exports),
  qi = (i, e) => {
    for (var t in e) ae(i, t, { get: e[t], enumerable: !0 })
  },
  ht = (i, e, t, r) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let n of ji(e))
        !Wi.call(i, n) &&
          n !== t &&
          ae(i, n, {
            get: () => e[n],
            enumerable: !(r = Ni(e, n)) || r.enumerable,
          })
    return i
  }
var M = (i, e, t) => (
    (t = i != null ? Li(Hi(i)) : {}),
    ht(
      e || !i || !i.__esModule
        ? ae(t, 'default', { value: i, enumerable: !0 })
        : t,
      i
    )
  ),
  Pi = (i) => ht(ae({}, '__esModule', { value: !0 }), i)
var pt = F((Ou, Ui) => {
  Ui.exports = {
    name: 'dotenv',
    version: '16.0.3',
    description: 'Loads environment variables from .env file',
    main: 'lib/main.js',
    types: 'lib/main.d.ts',
    exports: {
      '.': {
        require: './lib/main.js',
        types: './lib/main.d.ts',
        default: './lib/main.js',
      },
      './config': './config.js',
      './config.js': './config.js',
      './lib/env-options': './lib/env-options.js',
      './lib/env-options.js': './lib/env-options.js',
      './lib/cli-options': './lib/cli-options.js',
      './lib/cli-options.js': './lib/cli-options.js',
      './package.json': './package.json',
    },
    scripts: {
      'dts-check': 'tsc --project tests/types/tsconfig.json',
      lint: 'standard',
      'lint-readme': 'standard-markdown',
      pretest: 'npm run lint && npm run dts-check',
      test: 'tap tests/*.js --100 -Rspec',
      prerelease: 'npm test',
      release: 'standard-version',
    },
    repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
    keywords: [
      'dotenv',
      'env',
      '.env',
      'environment',
      'variables',
      'config',
      'settings',
    ],
    readmeFilename: 'README.md',
    license: 'BSD-2-Clause',
    devDependencies: {
      '@types/node': '^17.0.9',
      decache: '^4.6.1',
      dtslint: '^3.7.0',
      sinon: '^12.0.1',
      standard: '^16.0.4',
      'standard-markdown': '^7.1.0',
      'standard-version': '^9.3.2',
      tap: '^15.1.6',
      tar: '^6.1.11',
      typescript: '^4.5.4',
    },
    engines: { node: '>=12' },
  }
})
var ce = F((Su, De) => {
  var Gi = require('fs'),
    ft = require('path'),
    Yi = require('os'),
    zi = pt(),
    Ki = zi.version,
    Ji =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm
  function Zi(i) {
    let e = {},
      t = i.toString()
    t = t.replace(
      /\r\n?/gm,
      `
`
    )
    let r
    for (; (r = Ji.exec(t)) != null; ) {
      let n = r[1],
        u = r[2] || ''
      u = u.trim()
      let s = u[0]
      ;(u = u.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
        s === '"' &&
          ((u = u.replace(
            /\\n/g,
            `
`
          )),
          (u = u.replace(/\\r/g, '\r'))),
        (e[n] = u)
    }
    return e
  }
  function Be(i) {
    console.log(`[dotenv@${Ki}][DEBUG] ${i}`)
  }
  function Qi(i) {
    return i[0] === '~' ? ft.join(Yi.homedir(), i.slice(1)) : i
  }
  function Xi(i) {
    let e = ft.resolve(process.cwd(), '.env'),
      t = 'utf8',
      r = !!(i && i.debug),
      n = !!(i && i.override)
    i &&
      (i.path != null && (e = Qi(i.path)),
      i.encoding != null && (t = i.encoding))
    try {
      let u = le.parse(Gi.readFileSync(e, { encoding: t }))
      return (
        Object.keys(u).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? (n === !0 && (process.env[s] = u[s]),
              r &&
                Be(
                  n === !0
                    ? `"${s}" is already defined in \`process.env\` and WAS overwritten`
                    : `"${s}" is already defined in \`process.env\` and was NOT overwritten`
                ))
            : (process.env[s] = u[s])
        }),
        { parsed: u }
      )
    } catch (u) {
      return r && Be(`Failed to load ${e} ${u.message}`), { error: u }
    }
  }
  var le = { config: Xi, parse: Zi }
  De.exports.config = le.config
  De.exports.parse = le.parse
  De.exports = le
})
var J = F((ke) => {
  var he = class extends Error {
      constructor(e, t, r) {
        super(r),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name),
          (this.code = t),
          (this.exitCode = e),
          (this.nestedError = void 0)
      }
    },
    Te = class extends he {
      constructor(e) {
        super(1, 'commander.invalidArgument', e),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name)
      }
    }
  ke.CommanderError = he
  ke.InvalidArgumentError = Te
})
var pe = F((Re) => {
  var { InvalidArgumentError: en } = J(),
    $e = class {
      constructor(e, t) {
        switch (
          ((this.description = t || ''),
          (this.variadic = !1),
          (this.parseArg = void 0),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.argChoices = void 0),
          e[0])
        ) {
          case '<':
            ;(this.required = !0), (this._name = e.slice(1, -1))
            break
          case '[':
            ;(this.required = !1), (this._name = e.slice(1, -1))
            break
          default:
            ;(this.required = !0), (this._name = e)
            break
        }
        this._name.length > 3 &&
          this._name.slice(-3) === '...' &&
          ((this.variadic = !0), (this._name = this._name.slice(0, -3)))
      }
      name() {
        return this._name
      }
      _concatValue(e, t) {
        return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e)
      }
      default(e, t) {
        return (this.defaultValue = e), (this.defaultValueDescription = t), this
      }
      argParser(e) {
        return (this.parseArg = e), this
      }
      choices(e) {
        return (
          (this.argChoices = e.slice()),
          (this.parseArg = (t, r) => {
            if (!this.argChoices.includes(t))
              throw new en(`Allowed choices are ${this.argChoices.join(', ')}.`)
            return this.variadic ? this._concatValue(t, r) : t
          }),
          this
        )
      }
      argRequired() {
        return (this.required = !0), this
      }
      argOptional() {
        return (this.required = !1), this
      }
    }
  function tn(i) {
    let e = i.name() + (i.variadic === !0 ? '...' : '')
    return i.required ? '<' + e + '>' : '[' + e + ']'
  }
  Re.Argument = $e
  Re.humanReadableArgName = tn
})
var Me = F((dt) => {
  var { humanReadableArgName: rn } = pe(),
    Ie = class {
      constructor() {
        ;(this.helpWidth = void 0),
          (this.sortSubcommands = !1),
          (this.sortOptions = !1),
          (this.showGlobalOptions = !1)
      }
      visibleCommands(e) {
        let t = e.commands.filter((r) => !r._hidden)
        if (e._hasImplicitHelpCommand()) {
          let [, r, n] = e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),
            u = e.createCommand(r).helpOption(!1)
          u.description(e._helpCommandDescription),
            n && u.arguments(n),
            t.push(u)
        }
        return (
          this.sortSubcommands &&
            t.sort((r, n) => r.name().localeCompare(n.name())),
          t
        )
      }
      compareOptions(e, t) {
        let r = (n) =>
          n.short ? n.short.replace(/^-/, '') : n.long.replace(/^--/, '')
        return r(e).localeCompare(r(t))
      }
      visibleOptions(e) {
        let t = e.options.filter((u) => !u.hidden),
          r =
            e._hasHelpOption &&
            e._helpShortFlag &&
            !e._findOption(e._helpShortFlag),
          n = e._hasHelpOption && !e._findOption(e._helpLongFlag)
        if (r || n) {
          let u
          r
            ? n
              ? (u = e.createOption(e._helpFlags, e._helpDescription))
              : (u = e.createOption(e._helpShortFlag, e._helpDescription))
            : (u = e.createOption(e._helpLongFlag, e._helpDescription)),
            t.push(u)
        }
        return this.sortOptions && t.sort(this.compareOptions), t
      }
      visibleGlobalOptions(e) {
        if (!this.showGlobalOptions) return []
        let t = []
        for (let r = e.parent; r; r = r.parent) {
          let n = r.options.filter((u) => !u.hidden)
          t.push(...n)
        }
        return this.sortOptions && t.sort(this.compareOptions), t
      }
      visibleArguments(e) {
        return (
          e._argsDescription &&
            e._args.forEach((t) => {
              t.description =
                t.description || e._argsDescription[t.name()] || ''
            }),
          e._args.find((t) => t.description) ? e._args : []
        )
      }
      subcommandTerm(e) {
        let t = e._args.map((r) => rn(r)).join(' ')
        return (
          e._name +
          (e._aliases[0] ? '|' + e._aliases[0] : '') +
          (e.options.length ? ' [options]' : '') +
          (t ? ' ' + t : '')
        )
      }
      optionTerm(e) {
        return e.flags
      }
      argumentTerm(e) {
        return e.name()
      }
      longestSubcommandTermLength(e, t) {
        return t
          .visibleCommands(e)
          .reduce((r, n) => Math.max(r, t.subcommandTerm(n).length), 0)
      }
      longestOptionTermLength(e, t) {
        return t
          .visibleOptions(e)
          .reduce((r, n) => Math.max(r, t.optionTerm(n).length), 0)
      }
      longestGlobalOptionTermLength(e, t) {
        return t
          .visibleGlobalOptions(e)
          .reduce((r, n) => Math.max(r, t.optionTerm(n).length), 0)
      }
      longestArgumentTermLength(e, t) {
        return t
          .visibleArguments(e)
          .reduce((r, n) => Math.max(r, t.argumentTerm(n).length), 0)
      }
      commandUsage(e) {
        let t = e._name
        e._aliases[0] && (t = t + '|' + e._aliases[0])
        let r = ''
        for (let n = e.parent; n; n = n.parent) r = n.name() + ' ' + r
        return r + t + ' ' + e.usage()
      }
      commandDescription(e) {
        return e.description()
      }
      subcommandDescription(e) {
        return e.summary() || e.description()
      }
      optionDescription(e) {
        let t = []
        return (
          e.argChoices &&
            t.push(
              `choices: ${e.argChoices
                .map((r) => JSON.stringify(r))
                .join(', ')}`
            ),
          e.defaultValue !== void 0 &&
            (e.required ||
              e.optional ||
              (e.isBoolean() && typeof e.defaultValue == 'boolean')) &&
            t.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          e.presetArg !== void 0 &&
            e.optional &&
            t.push(`preset: ${JSON.stringify(e.presetArg)}`),
          e.envVar !== void 0 && t.push(`env: ${e.envVar}`),
          t.length > 0 ? `${e.description} (${t.join(', ')})` : e.description
        )
      }
      argumentDescription(e) {
        let t = []
        if (
          (e.argChoices &&
            t.push(
              `choices: ${e.argChoices
                .map((r) => JSON.stringify(r))
                .join(', ')}`
            ),
          e.defaultValue !== void 0 &&
            t.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          t.length > 0)
        ) {
          let r = `(${t.join(', ')})`
          return e.description ? `${e.description} ${r}` : r
        }
        return e.description
      }
      formatHelp(e, t) {
        let r = t.padWidth(e, t),
          n = t.helpWidth || 80,
          u = 2,
          s = 2
        function l(D, p) {
          if (p) {
            let d = `${D.padEnd(r + s)}${p}`
            return t.wrap(d, n - u, r + s)
          }
          return D
        }
        function o(D) {
          return D.join(
            `
`
          ).replace(/^/gm, ' '.repeat(u))
        }
        let a = [`Usage: ${t.commandUsage(e)}`, ''],
          c = t.commandDescription(e)
        c.length > 0 && (a = a.concat([t.wrap(c, n, 0), '']))
        let f = t
          .visibleArguments(e)
          .map((D) => l(t.argumentTerm(D), t.argumentDescription(D)))
        f.length > 0 && (a = a.concat(['Arguments:', o(f), '']))
        let g = t
          .visibleOptions(e)
          .map((D) => l(t.optionTerm(D), t.optionDescription(D)))
        if (
          (g.length > 0 && (a = a.concat(['Options:', o(g), ''])),
          this.showGlobalOptions)
        ) {
          let D = t
            .visibleGlobalOptions(e)
            .map((p) => l(t.optionTerm(p), t.optionDescription(p)))
          D.length > 0 && (a = a.concat(['Global Options:', o(D), '']))
        }
        let h = t
          .visibleCommands(e)
          .map((D) => l(t.subcommandTerm(D), t.subcommandDescription(D)))
        return (
          h.length > 0 && (a = a.concat(['Commands:', o(h), ''])),
          a.join(`
`)
        )
      }
      padWidth(e, t) {
        return Math.max(
          t.longestOptionTermLength(e, t),
          t.longestGlobalOptionTermLength(e, t),
          t.longestSubcommandTermLength(e, t),
          t.longestArgumentTermLength(e, t)
        )
      }
      wrap(e, t, r, n = 40) {
        let u = ' \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF',
          s = new RegExp(`[\\n][${u}]+`)
        if (e.match(s)) return e
        let l = t - r
        if (l < n) return e
        let o = e.slice(0, r),
          a = e.slice(r).replace(
            `\r
`,
            `
`
          ),
          c = ' '.repeat(r),
          g = '\\s\u200B',
          h = new RegExp(
            `
|.{1,${l - 1}}([${g}]|$)|[^${g}]+?([${g}]|$)`,
            'g'
          ),
          D = a.match(h) || []
        return (
          o +
          D.map((p, d) =>
            p ===
            `
`
              ? ''
              : (d > 0 ? c : '') + p.trimEnd()
          ).join(`
`)
        )
      }
    }
  dt.Help = Ie
})
var Ne = F((fe) => {
  var { InvalidArgumentError: nn } = J(),
    Ve = class {
      constructor(e, t) {
        ;(this.flags = e),
          (this.description = t || ''),
          (this.required = e.includes('<')),
          (this.optional = e.includes('[')),
          (this.variadic = /\w\.\.\.[>\]]$/.test(e)),
          (this.mandatory = !1)
        let r = mt(e)
        ;(this.short = r.shortFlag),
          (this.long = r.longFlag),
          (this.negate = !1),
          this.long && (this.negate = this.long.startsWith('--no-')),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.presetArg = void 0),
          (this.envVar = void 0),
          (this.parseArg = void 0),
          (this.hidden = !1),
          (this.argChoices = void 0),
          (this.conflictsWith = []),
          (this.implied = void 0)
      }
      default(e, t) {
        return (this.defaultValue = e), (this.defaultValueDescription = t), this
      }
      preset(e) {
        return (this.presetArg = e), this
      }
      conflicts(e) {
        return (this.conflictsWith = this.conflictsWith.concat(e)), this
      }
      implies(e) {
        let t = e
        return (
          typeof e == 'string' && (t = { [e]: !0 }),
          (this.implied = Object.assign(this.implied || {}, t)),
          this
        )
      }
      env(e) {
        return (this.envVar = e), this
      }
      argParser(e) {
        return (this.parseArg = e), this
      }
      makeOptionMandatory(e = !0) {
        return (this.mandatory = !!e), this
      }
      hideHelp(e = !0) {
        return (this.hidden = !!e), this
      }
      _concatValue(e, t) {
        return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e)
      }
      choices(e) {
        return (
          (this.argChoices = e.slice()),
          (this.parseArg = (t, r) => {
            if (!this.argChoices.includes(t))
              throw new nn(`Allowed choices are ${this.argChoices.join(', ')}.`)
            return this.variadic ? this._concatValue(t, r) : t
          }),
          this
        )
      }
      name() {
        return this.long
          ? this.long.replace(/^--/, '')
          : this.short.replace(/^-/, '')
      }
      attributeName() {
        return un(this.name().replace(/^no-/, ''))
      }
      is(e) {
        return this.short === e || this.long === e
      }
      isBoolean() {
        return !this.required && !this.optional && !this.negate
      }
    },
    Le = class {
      constructor(e) {
        ;(this.positiveOptions = new Map()),
          (this.negativeOptions = new Map()),
          (this.dualOptions = new Set()),
          e.forEach((t) => {
            t.negate
              ? this.negativeOptions.set(t.attributeName(), t)
              : this.positiveOptions.set(t.attributeName(), t)
          }),
          this.negativeOptions.forEach((t, r) => {
            this.positiveOptions.has(r) && this.dualOptions.add(r)
          })
      }
      valueFromOption(e, t) {
        let r = t.attributeName()
        if (!this.dualOptions.has(r)) return !0
        let n = this.negativeOptions.get(r).presetArg,
          u = n !== void 0 ? n : !1
        return t.negate === (u === e)
      }
    }
  function un(i) {
    return i.split('-').reduce((e, t) => e + t[0].toUpperCase() + t.slice(1))
  }
  function mt(i) {
    let e,
      t,
      r = i.split(/[ |,]+/)
    return (
      r.length > 1 && !/^[[<]/.test(r[1]) && (e = r.shift()),
      (t = r.shift()),
      !e && /^-[^-]$/.test(t) && ((e = t), (t = void 0)),
      { shortFlag: e, longFlag: t }
    )
  }
  fe.Option = Ve
  fe.splitOptionFlags = mt
  fe.DualOptions = Le
})
var Ct = F((gt) => {
  function sn(i, e) {
    if (Math.abs(i.length - e.length) > 3) return Math.max(i.length, e.length)
    let t = []
    for (let r = 0; r <= i.length; r++) t[r] = [r]
    for (let r = 0; r <= e.length; r++) t[0][r] = r
    for (let r = 1; r <= e.length; r++)
      for (let n = 1; n <= i.length; n++) {
        let u = 1
        i[n - 1] === e[r - 1] ? (u = 0) : (u = 1),
          (t[n][r] = Math.min(
            t[n - 1][r] + 1,
            t[n][r - 1] + 1,
            t[n - 1][r - 1] + u
          )),
          n > 1 &&
            r > 1 &&
            i[n - 1] === e[r - 2] &&
            i[n - 2] === e[r - 1] &&
            (t[n][r] = Math.min(t[n][r], t[n - 2][r - 2] + 1))
      }
    return t[i.length][e.length]
  }
  function on(i, e) {
    if (!e || e.length === 0) return ''
    e = Array.from(new Set(e))
    let t = i.startsWith('--')
    t && ((i = i.slice(2)), (e = e.map((s) => s.slice(2))))
    let r = [],
      n = 3,
      u = 0.4
    return (
      e.forEach((s) => {
        if (s.length <= 1) return
        let l = sn(i, s),
          o = Math.max(i.length, s.length)
        ;(o - l) / o > u &&
          (l < n ? ((n = l), (r = [s])) : l === n && r.push(s))
      }),
      r.sort((s, l) => s.localeCompare(l)),
      t && (r = r.map((s) => `--${s}`)),
      r.length > 1
        ? `
(Did you mean one of ${r.join(', ')}?)`
        : r.length === 1
        ? `
(Did you mean ${r[0]}?)`
        : ''
    )
  }
  gt.suggestSimilar = on
})
var yt = F((_t) => {
  var an = require('events').EventEmitter,
    je = require('child_process'),
    L = require('path'),
    He = require('fs'),
    b = require('process'),
    { Argument: ln, humanReadableArgName: Dn } = pe(),
    { CommanderError: We } = J(),
    { Help: cn } = Me(),
    { Option: Ft, splitOptionFlags: hn, DualOptions: pn } = Ne(),
    { suggestSimilar: Et } = Ct(),
    Q = class extends an {
      constructor(e) {
        super(),
          (this.commands = []),
          (this.options = []),
          (this.parent = null),
          (this._allowUnknownOption = !1),
          (this._allowExcessArguments = !0),
          (this._args = []),
          (this.args = []),
          (this.rawArgs = []),
          (this.processedArgs = []),
          (this._scriptPath = null),
          (this._name = e || ''),
          (this._optionValues = {}),
          (this._optionValueSources = {}),
          (this._storeOptionsAsProperties = !1),
          (this._actionHandler = null),
          (this._executableHandler = !1),
          (this._executableFile = null),
          (this._executableDir = null),
          (this._defaultCommandName = null),
          (this._exitCallback = null),
          (this._aliases = []),
          (this._combineFlagAndOptionalValue = !0),
          (this._description = ''),
          (this._summary = ''),
          (this._argsDescription = void 0),
          (this._enablePositionalOptions = !1),
          (this._passThroughOptions = !1),
          (this._lifeCycleHooks = {}),
          (this._showHelpAfterError = !1),
          (this._showSuggestionAfterError = !0),
          (this._outputConfiguration = {
            writeOut: (t) => b.stdout.write(t),
            writeErr: (t) => b.stderr.write(t),
            getOutHelpWidth: () => (b.stdout.isTTY ? b.stdout.columns : void 0),
            getErrHelpWidth: () => (b.stderr.isTTY ? b.stderr.columns : void 0),
            outputError: (t, r) => r(t),
          }),
          (this._hidden = !1),
          (this._hasHelpOption = !0),
          (this._helpFlags = '-h, --help'),
          (this._helpDescription = 'display help for command'),
          (this._helpShortFlag = '-h'),
          (this._helpLongFlag = '--help'),
          (this._addImplicitHelpCommand = void 0),
          (this._helpCommandName = 'help'),
          (this._helpCommandnameAndArgs = 'help [command]'),
          (this._helpCommandDescription = 'display help for command'),
          (this._helpConfiguration = {})
      }
      copyInheritedSettings(e) {
        return (
          (this._outputConfiguration = e._outputConfiguration),
          (this._hasHelpOption = e._hasHelpOption),
          (this._helpFlags = e._helpFlags),
          (this._helpDescription = e._helpDescription),
          (this._helpShortFlag = e._helpShortFlag),
          (this._helpLongFlag = e._helpLongFlag),
          (this._helpCommandName = e._helpCommandName),
          (this._helpCommandnameAndArgs = e._helpCommandnameAndArgs),
          (this._helpCommandDescription = e._helpCommandDescription),
          (this._helpConfiguration = e._helpConfiguration),
          (this._exitCallback = e._exitCallback),
          (this._storeOptionsAsProperties = e._storeOptionsAsProperties),
          (this._combineFlagAndOptionalValue = e._combineFlagAndOptionalValue),
          (this._allowExcessArguments = e._allowExcessArguments),
          (this._enablePositionalOptions = e._enablePositionalOptions),
          (this._showHelpAfterError = e._showHelpAfterError),
          (this._showSuggestionAfterError = e._showSuggestionAfterError),
          this
        )
      }
      command(e, t, r) {
        let n = t,
          u = r
        typeof n == 'object' && n !== null && ((u = n), (n = null)),
          (u = u || {})
        let [, s, l] = e.match(/([^ ]+) *(.*)/),
          o = this.createCommand(s)
        return (
          n && (o.description(n), (o._executableHandler = !0)),
          u.isDefault && (this._defaultCommandName = o._name),
          (o._hidden = !!(u.noHelp || u.hidden)),
          (o._executableFile = u.executableFile || null),
          l && o.arguments(l),
          this.commands.push(o),
          (o.parent = this),
          o.copyInheritedSettings(this),
          n ? this : o
        )
      }
      createCommand(e) {
        return new Q(e)
      }
      createHelp() {
        return Object.assign(new cn(), this.configureHelp())
      }
      configureHelp(e) {
        return e === void 0
          ? this._helpConfiguration
          : ((this._helpConfiguration = e), this)
      }
      configureOutput(e) {
        return e === void 0
          ? this._outputConfiguration
          : (Object.assign(this._outputConfiguration, e), this)
      }
      showHelpAfterError(e = !0) {
        return (
          typeof e != 'string' && (e = !!e),
          (this._showHelpAfterError = e),
          this
        )
      }
      showSuggestionAfterError(e = !0) {
        return (this._showSuggestionAfterError = !!e), this
      }
      addCommand(e, t) {
        if (!e._name)
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`)
        return (
          (t = t || {}),
          t.isDefault && (this._defaultCommandName = e._name),
          (t.noHelp || t.hidden) && (e._hidden = !0),
          this.commands.push(e),
          (e.parent = this),
          this
        )
      }
      createArgument(e, t) {
        return new ln(e, t)
      }
      argument(e, t, r, n) {
        let u = this.createArgument(e, t)
        return (
          typeof r == 'function' ? u.default(n).argParser(r) : u.default(r),
          this.addArgument(u),
          this
        )
      }
      arguments(e) {
        return (
          e.split(/ +/).forEach((t) => {
            this.argument(t)
          }),
          this
        )
      }
      addArgument(e) {
        let t = this._args.slice(-1)[0]
        if (t && t.variadic)
          throw new Error(
            `only the last argument can be variadic '${t.name()}'`
          )
        if (e.required && e.defaultValue !== void 0 && e.parseArg === void 0)
          throw new Error(
            `a default value for a required argument is never used: '${e.name()}'`
          )
        return this._args.push(e), this
      }
      addHelpCommand(e, t) {
        return (
          e === !1
            ? (this._addImplicitHelpCommand = !1)
            : ((this._addImplicitHelpCommand = !0),
              typeof e == 'string' &&
                ((this._helpCommandName = e.split(' ')[0]),
                (this._helpCommandnameAndArgs = e)),
              (this._helpCommandDescription =
                t || this._helpCommandDescription)),
          this
        )
      }
      _hasImplicitHelpCommand() {
        return this._addImplicitHelpCommand === void 0
          ? this.commands.length &&
              !this._actionHandler &&
              !this._findCommand('help')
          : this._addImplicitHelpCommand
      }
      hook(e, t) {
        let r = ['preSubcommand', 'preAction', 'postAction']
        if (!r.includes(e))
          throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`)
        return (
          this._lifeCycleHooks[e]
            ? this._lifeCycleHooks[e].push(t)
            : (this._lifeCycleHooks[e] = [t]),
          this
        )
      }
      exitOverride(e) {
        return (
          e
            ? (this._exitCallback = e)
            : (this._exitCallback = (t) => {
                if (t.code !== 'commander.executeSubCommandAsync') throw t
              }),
          this
        )
      }
      _exit(e, t, r) {
        this._exitCallback && this._exitCallback(new We(e, t, r)), b.exit(e)
      }
      action(e) {
        let t = (r) => {
          let n = this._args.length,
            u = r.slice(0, n)
          return (
            this._storeOptionsAsProperties
              ? (u[n] = this)
              : (u[n] = this.opts()),
            u.push(this),
            e.apply(this, u)
          )
        }
        return (this._actionHandler = t), this
      }
      createOption(e, t) {
        return new Ft(e, t)
      }
      addOption(e) {
        let t = e.name(),
          r = e.attributeName()
        if (e.negate) {
          let u = e.long.replace(/^--no-/, '--')
          this._findOption(u) ||
            this.setOptionValueWithSource(
              r,
              e.defaultValue === void 0 ? !0 : e.defaultValue,
              'default'
            )
        } else
          e.defaultValue !== void 0 &&
            this.setOptionValueWithSource(r, e.defaultValue, 'default')
        this.options.push(e)
        let n = (u, s, l) => {
          u == null && e.presetArg !== void 0 && (u = e.presetArg)
          let o = this.getOptionValue(r)
          if (u !== null && e.parseArg)
            try {
              u = e.parseArg(u, o)
            } catch (a) {
              if (a.code === 'commander.invalidArgument') {
                let c = `${s} ${a.message}`
                this.error(c, { exitCode: a.exitCode, code: a.code })
              }
              throw a
            }
          else u !== null && e.variadic && (u = e._concatValue(u, o))
          u == null &&
            (e.negate
              ? (u = !1)
              : e.isBoolean() || e.optional
              ? (u = !0)
              : (u = '')),
            this.setOptionValueWithSource(r, u, l)
        }
        return (
          this.on('option:' + t, (u) => {
            let s = `error: option '${e.flags}' argument '${u}' is invalid.`
            n(u, s, 'cli')
          }),
          e.envVar &&
            this.on('optionEnv:' + t, (u) => {
              let s = `error: option '${e.flags}' value '${u}' from env '${e.envVar}' is invalid.`
              n(u, s, 'env')
            }),
          this
        )
      }
      _optionEx(e, t, r, n, u) {
        if (typeof t == 'object' && t instanceof Ft)
          throw new Error(
            'To add an Option object use addOption() instead of option() or requiredOption()'
          )
        let s = this.createOption(t, r)
        if ((s.makeOptionMandatory(!!e.mandatory), typeof n == 'function'))
          s.default(u).argParser(n)
        else if (n instanceof RegExp) {
          let l = n
          ;(n = (o, a) => {
            let c = l.exec(o)
            return c ? c[0] : a
          }),
            s.default(u).argParser(n)
        } else s.default(n)
        return this.addOption(s)
      }
      option(e, t, r, n) {
        return this._optionEx({}, e, t, r, n)
      }
      requiredOption(e, t, r, n) {
        return this._optionEx({ mandatory: !0 }, e, t, r, n)
      }
      combineFlagAndOptionalValue(e = !0) {
        return (this._combineFlagAndOptionalValue = !!e), this
      }
      allowUnknownOption(e = !0) {
        return (this._allowUnknownOption = !!e), this
      }
      allowExcessArguments(e = !0) {
        return (this._allowExcessArguments = !!e), this
      }
      enablePositionalOptions(e = !0) {
        return (this._enablePositionalOptions = !!e), this
      }
      passThroughOptions(e = !0) {
        if (
          ((this._passThroughOptions = !!e),
          this.parent && e && !this.parent._enablePositionalOptions)
        )
          throw new Error(
            'passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)'
          )
        return this
      }
      storeOptionsAsProperties(e = !0) {
        if (((this._storeOptionsAsProperties = !!e), this.options.length))
          throw new Error(
            'call .storeOptionsAsProperties() before adding options'
          )
        return this
      }
      getOptionValue(e) {
        return this._storeOptionsAsProperties ? this[e] : this._optionValues[e]
      }
      setOptionValue(e, t) {
        return this.setOptionValueWithSource(e, t, void 0)
      }
      setOptionValueWithSource(e, t, r) {
        return (
          this._storeOptionsAsProperties
            ? (this[e] = t)
            : (this._optionValues[e] = t),
          (this._optionValueSources[e] = r),
          this
        )
      }
      getOptionValueSource(e) {
        return this._optionValueSources[e]
      }
      getOptionValueSourceWithGlobals(e) {
        let t
        return (
          Z(this).forEach((r) => {
            r.getOptionValueSource(e) !== void 0 &&
              (t = r.getOptionValueSource(e))
          }),
          t
        )
      }
      _prepareUserArgs(e, t) {
        if (e !== void 0 && !Array.isArray(e))
          throw new Error('first parameter to parse must be array or undefined')
        ;(t = t || {}),
          e === void 0 &&
            ((e = b.argv),
            b.versions && b.versions.electron && (t.from = 'electron')),
          (this.rawArgs = e.slice())
        let r
        switch (t.from) {
          case void 0:
          case 'node':
            ;(this._scriptPath = e[1]), (r = e.slice(2))
            break
          case 'electron':
            b.defaultApp
              ? ((this._scriptPath = e[1]), (r = e.slice(2)))
              : (r = e.slice(1))
            break
          case 'user':
            r = e.slice(0)
            break
          default:
            throw new Error(`unexpected parse option { from: '${t.from}' }`)
        }
        return (
          !this._name &&
            this._scriptPath &&
            this.nameFromFilename(this._scriptPath),
          (this._name = this._name || 'program'),
          r
        )
      }
      parse(e, t) {
        let r = this._prepareUserArgs(e, t)
        return this._parseCommand([], r), this
      }
      async parseAsync(e, t) {
        let r = this._prepareUserArgs(e, t)
        return await this._parseCommand([], r), this
      }
      _executeSubCommand(e, t) {
        t = t.slice()
        let r = !1,
          n = ['.js', '.ts', '.tsx', '.mjs', '.cjs']
        function u(c, f) {
          let g = L.resolve(c, f)
          if (He.existsSync(g)) return g
          if (n.includes(L.extname(f))) return
          let h = n.find((D) => He.existsSync(`${g}${D}`))
          if (h) return `${g}${h}`
        }
        this._checkForMissingMandatoryOptions(),
          this._checkForConflictingOptions()
        let s = e._executableFile || `${this._name}-${e._name}`,
          l = this._executableDir || ''
        if (this._scriptPath) {
          let c
          try {
            c = He.realpathSync(this._scriptPath)
          } catch {
            c = this._scriptPath
          }
          l = L.resolve(L.dirname(c), l)
        }
        if (l) {
          let c = u(l, s)
          if (!c && !e._executableFile && this._scriptPath) {
            let f = L.basename(this._scriptPath, L.extname(this._scriptPath))
            f !== this._name && (c = u(l, `${f}-${e._name}`))
          }
          s = c || s
        }
        r = n.includes(L.extname(s))
        let o
        b.platform !== 'win32'
          ? r
            ? (t.unshift(s),
              (t = At(b.execArgv).concat(t)),
              (o = je.spawn(b.argv[0], t, { stdio: 'inherit' })))
            : (o = je.spawn(s, t, { stdio: 'inherit' }))
          : (t.unshift(s),
            (t = At(b.execArgv).concat(t)),
            (o = je.spawn(b.execPath, t, { stdio: 'inherit' }))),
          o.killed ||
            ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'].forEach(
              (f) => {
                b.on(f, () => {
                  o.killed === !1 && o.exitCode === null && o.kill(f)
                })
              }
            )
        let a = this._exitCallback
        a
          ? o.on('close', () => {
              a(
                new We(
                  b.exitCode || 0,
                  'commander.executeSubCommandAsync',
                  '(close)'
                )
              )
            })
          : o.on('close', b.exit.bind(b)),
          o.on('error', (c) => {
            if (c.code === 'ENOENT') {
              let f = l
                  ? `searched for local subcommand relative to directory '${l}'`
                  : 'no directory for search for local subcommand, use .executableDir() to supply a custom directory',
                g = `'${s}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`
              throw new Error(g)
            } else if (c.code === 'EACCES')
              throw new Error(`'${s}' not executable`)
            if (!a) b.exit(1)
            else {
              let f = new We(1, 'commander.executeSubCommandAsync', '(error)')
              ;(f.nestedError = c), a(f)
            }
          }),
          (this.runningCommand = o)
      }
      _dispatchSubcommand(e, t, r) {
        let n = this._findCommand(e)
        n || this.help({ error: !0 })
        let u
        return (
          (u = this._chainOrCallSubCommandHook(u, n, 'preSubcommand')),
          (u = this._chainOrCall(u, () => {
            if (n._executableHandler) this._executeSubCommand(n, t.concat(r))
            else return n._parseCommand(t, r)
          })),
          u
        )
      }
      _checkNumberOfArguments() {
        this._args.forEach((e, t) => {
          e.required && this.args[t] == null && this.missingArgument(e.name())
        }),
          !(
            this._args.length > 0 && this._args[this._args.length - 1].variadic
          ) &&
            this.args.length > this._args.length &&
            this._excessArguments(this.args)
      }
      _processArguments() {
        let e = (r, n, u) => {
          let s = n
          if (n !== null && r.parseArg)
            try {
              s = r.parseArg(n, u)
            } catch (l) {
              if (l.code === 'commander.invalidArgument') {
                let o = `error: command-argument value '${n}' is invalid for argument '${r.name()}'. ${
                  l.message
                }`
                this.error(o, { exitCode: l.exitCode, code: l.code })
              }
              throw l
            }
          return s
        }
        this._checkNumberOfArguments()
        let t = []
        this._args.forEach((r, n) => {
          let u = r.defaultValue
          r.variadic
            ? n < this.args.length
              ? ((u = this.args.slice(n)),
                r.parseArg &&
                  (u = u.reduce((s, l) => e(r, l, s), r.defaultValue)))
              : u === void 0 && (u = [])
            : n < this.args.length &&
              ((u = this.args[n]), r.parseArg && (u = e(r, u, r.defaultValue))),
            (t[n] = u)
        }),
          (this.processedArgs = t)
      }
      _chainOrCall(e, t) {
        return e && e.then && typeof e.then == 'function'
          ? e.then(() => t())
          : t()
      }
      _chainOrCallHooks(e, t) {
        let r = e,
          n = []
        return (
          Z(this)
            .reverse()
            .filter((u) => u._lifeCycleHooks[t] !== void 0)
            .forEach((u) => {
              u._lifeCycleHooks[t].forEach((s) => {
                n.push({ hookedCommand: u, callback: s })
              })
            }),
          t === 'postAction' && n.reverse(),
          n.forEach((u) => {
            r = this._chainOrCall(r, () => u.callback(u.hookedCommand, this))
          }),
          r
        )
      }
      _chainOrCallSubCommandHook(e, t, r) {
        let n = e
        return (
          this._lifeCycleHooks[r] !== void 0 &&
            this._lifeCycleHooks[r].forEach((u) => {
              n = this._chainOrCall(n, () => u(this, t))
            }),
          n
        )
      }
      _parseCommand(e, t) {
        let r = this.parseOptions(t)
        if (
          (this._parseOptionsEnv(),
          this._parseOptionsImplied(),
          (e = e.concat(r.operands)),
          (t = r.unknown),
          (this.args = e.concat(t)),
          e && this._findCommand(e[0]))
        )
          return this._dispatchSubcommand(e[0], e.slice(1), t)
        if (this._hasImplicitHelpCommand() && e[0] === this._helpCommandName)
          return (
            e.length === 1 && this.help(),
            this._dispatchSubcommand(e[1], [], [this._helpLongFlag])
          )
        if (this._defaultCommandName)
          return (
            bt(this, t),
            this._dispatchSubcommand(this._defaultCommandName, e, t)
          )
        this.commands.length &&
          this.args.length === 0 &&
          !this._actionHandler &&
          !this._defaultCommandName &&
          this.help({ error: !0 }),
          bt(this, r.unknown),
          this._checkForMissingMandatoryOptions(),
          this._checkForConflictingOptions()
        let n = () => {
            r.unknown.length > 0 && this.unknownOption(r.unknown[0])
          },
          u = `command:${this.name()}`
        if (this._actionHandler) {
          n(), this._processArguments()
          let s
          return (
            (s = this._chainOrCallHooks(s, 'preAction')),
            (s = this._chainOrCall(s, () =>
              this._actionHandler(this.processedArgs)
            )),
            this.parent &&
              (s = this._chainOrCall(s, () => {
                this.parent.emit(u, e, t)
              })),
            (s = this._chainOrCallHooks(s, 'postAction')),
            s
          )
        }
        if (this.parent && this.parent.listenerCount(u))
          n(), this._processArguments(), this.parent.emit(u, e, t)
        else if (e.length) {
          if (this._findCommand('*')) return this._dispatchSubcommand('*', e, t)
          this.listenerCount('command:*')
            ? this.emit('command:*', e, t)
            : this.commands.length
            ? this.unknownCommand()
            : (n(), this._processArguments())
        } else
          this.commands.length
            ? (n(), this.help({ error: !0 }))
            : (n(), this._processArguments())
      }
      _findCommand(e) {
        if (e)
          return this.commands.find(
            (t) => t._name === e || t._aliases.includes(e)
          )
      }
      _findOption(e) {
        return this.options.find((t) => t.is(e))
      }
      _checkForMissingMandatoryOptions() {
        for (let e = this; e; e = e.parent)
          e.options.forEach((t) => {
            t.mandatory &&
              e.getOptionValue(t.attributeName()) === void 0 &&
              e.missingMandatoryOptionValue(t)
          })
      }
      _checkForConflictingLocalOptions() {
        let e = this.options.filter((r) => {
          let n = r.attributeName()
          return this.getOptionValue(n) === void 0
            ? !1
            : this.getOptionValueSource(n) !== 'default'
        })
        e.filter((r) => r.conflictsWith.length > 0).forEach((r) => {
          let n = e.find((u) => r.conflictsWith.includes(u.attributeName()))
          n && this._conflictingOption(r, n)
        })
      }
      _checkForConflictingOptions() {
        for (let e = this; e; e = e.parent) e._checkForConflictingLocalOptions()
      }
      parseOptions(e) {
        let t = [],
          r = [],
          n = t,
          u = e.slice()
        function s(o) {
          return o.length > 1 && o[0] === '-'
        }
        let l = null
        for (; u.length; ) {
          let o = u.shift()
          if (o === '--') {
            n === r && n.push(o), n.push(...u)
            break
          }
          if (l && !s(o)) {
            this.emit(`option:${l.name()}`, o)
            continue
          }
          if (((l = null), s(o))) {
            let a = this._findOption(o)
            if (a) {
              if (a.required) {
                let c = u.shift()
                c === void 0 && this.optionMissingArgument(a),
                  this.emit(`option:${a.name()}`, c)
              } else if (a.optional) {
                let c = null
                u.length > 0 && !s(u[0]) && (c = u.shift()),
                  this.emit(`option:${a.name()}`, c)
              } else this.emit(`option:${a.name()}`)
              l = a.variadic ? a : null
              continue
            }
          }
          if (o.length > 2 && o[0] === '-' && o[1] !== '-') {
            let a = this._findOption(`-${o[1]}`)
            if (a) {
              a.required || (a.optional && this._combineFlagAndOptionalValue)
                ? this.emit(`option:${a.name()}`, o.slice(2))
                : (this.emit(`option:${a.name()}`), u.unshift(`-${o.slice(2)}`))
              continue
            }
          }
          if (/^--[^=]+=/.test(o)) {
            let a = o.indexOf('='),
              c = this._findOption(o.slice(0, a))
            if (c && (c.required || c.optional)) {
              this.emit(`option:${c.name()}`, o.slice(a + 1))
              continue
            }
          }
          if (
            (s(o) && (n = r),
            (this._enablePositionalOptions || this._passThroughOptions) &&
              t.length === 0 &&
              r.length === 0)
          ) {
            if (this._findCommand(o)) {
              t.push(o), u.length > 0 && r.push(...u)
              break
            } else if (
              o === this._helpCommandName &&
              this._hasImplicitHelpCommand()
            ) {
              t.push(o), u.length > 0 && t.push(...u)
              break
            } else if (this._defaultCommandName) {
              r.push(o), u.length > 0 && r.push(...u)
              break
            }
          }
          if (this._passThroughOptions) {
            n.push(o), u.length > 0 && n.push(...u)
            break
          }
          n.push(o)
        }
        return { operands: t, unknown: r }
      }
      opts() {
        if (this._storeOptionsAsProperties) {
          let e = {},
            t = this.options.length
          for (let r = 0; r < t; r++) {
            let n = this.options[r].attributeName()
            e[n] = n === this._versionOptionName ? this._version : this[n]
          }
          return e
        }
        return this._optionValues
      }
      optsWithGlobals() {
        return Z(this).reduce((e, t) => Object.assign(e, t.opts()), {})
      }
      error(e, t) {
        this._outputConfiguration.outputError(
          `${e}
`,
          this._outputConfiguration.writeErr
        ),
          typeof this._showHelpAfterError == 'string'
            ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`)
            : this._showHelpAfterError &&
              (this._outputConfiguration.writeErr(`
`),
              this.outputHelp({ error: !0 }))
        let r = t || {},
          n = r.exitCode || 1,
          u = r.code || 'commander.error'
        this._exit(n, u, e)
      }
      _parseOptionsEnv() {
        this.options.forEach((e) => {
          if (e.envVar && e.envVar in b.env) {
            let t = e.attributeName()
            ;(this.getOptionValue(t) === void 0 ||
              ['default', 'config', 'env'].includes(
                this.getOptionValueSource(t)
              )) &&
              (e.required || e.optional
                ? this.emit(`optionEnv:${e.name()}`, b.env[e.envVar])
                : this.emit(`optionEnv:${e.name()}`))
          }
        })
      }
      _parseOptionsImplied() {
        let e = new pn(this.options),
          t = (r) =>
            this.getOptionValue(r) !== void 0 &&
            !['default', 'implied'].includes(this.getOptionValueSource(r))
        this.options
          .filter(
            (r) =>
              r.implied !== void 0 &&
              t(r.attributeName()) &&
              e.valueFromOption(this.getOptionValue(r.attributeName()), r)
          )
          .forEach((r) => {
            Object.keys(r.implied)
              .filter((n) => !t(n))
              .forEach((n) => {
                this.setOptionValueWithSource(n, r.implied[n], 'implied')
              })
          })
      }
      missingArgument(e) {
        let t = `error: missing required argument '${e}'`
        this.error(t, { code: 'commander.missingArgument' })
      }
      optionMissingArgument(e) {
        let t = `error: option '${e.flags}' argument missing`
        this.error(t, { code: 'commander.optionMissingArgument' })
      }
      missingMandatoryOptionValue(e) {
        let t = `error: required option '${e.flags}' not specified`
        this.error(t, { code: 'commander.missingMandatoryOptionValue' })
      }
      _conflictingOption(e, t) {
        let r = (s) => {
            let l = s.attributeName(),
              o = this.getOptionValue(l),
              a = this.options.find((f) => f.negate && l === f.attributeName()),
              c = this.options.find((f) => !f.negate && l === f.attributeName())
            return a &&
              ((a.presetArg === void 0 && o === !1) ||
                (a.presetArg !== void 0 && o === a.presetArg))
              ? a
              : c || s
          },
          n = (s) => {
            let l = r(s),
              o = l.attributeName()
            return this.getOptionValueSource(o) === 'env'
              ? `environment variable '${l.envVar}'`
              : `option '${l.flags}'`
          },
          u = `error: ${n(e)} cannot be used with ${n(t)}`
        this.error(u, { code: 'commander.conflictingOption' })
      }
      unknownOption(e) {
        if (this._allowUnknownOption) return
        let t = ''
        if (e.startsWith('--') && this._showSuggestionAfterError) {
          let n = [],
            u = this
          do {
            let s = u
              .createHelp()
              .visibleOptions(u)
              .filter((l) => l.long)
              .map((l) => l.long)
            ;(n = n.concat(s)), (u = u.parent)
          } while (u && !u._enablePositionalOptions)
          t = Et(e, n)
        }
        let r = `error: unknown option '${e}'${t}`
        this.error(r, { code: 'commander.unknownOption' })
      }
      _excessArguments(e) {
        if (this._allowExcessArguments) return
        let t = this._args.length,
          r = t === 1 ? '' : 's',
          u = `error: too many arguments${
            this.parent ? ` for '${this.name()}'` : ''
          }. Expected ${t} argument${r} but got ${e.length}.`
        this.error(u, { code: 'commander.excessArguments' })
      }
      unknownCommand() {
        let e = this.args[0],
          t = ''
        if (this._showSuggestionAfterError) {
          let n = []
          this.createHelp()
            .visibleCommands(this)
            .forEach((u) => {
              n.push(u.name()), u.alias() && n.push(u.alias())
            }),
            (t = Et(e, n))
        }
        let r = `error: unknown command '${e}'${t}`
        this.error(r, { code: 'commander.unknownCommand' })
      }
      version(e, t, r) {
        if (e === void 0) return this._version
        ;(this._version = e),
          (t = t || '-V, --version'),
          (r = r || 'output the version number')
        let n = this.createOption(t, r)
        return (
          (this._versionOptionName = n.attributeName()),
          this.options.push(n),
          this.on('option:' + n.name(), () => {
            this._outputConfiguration.writeOut(`${e}
`),
              this._exit(0, 'commander.version', e)
          }),
          this
        )
      }
      description(e, t) {
        return e === void 0 && t === void 0
          ? this._description
          : ((this._description = e), t && (this._argsDescription = t), this)
      }
      summary(e) {
        return e === void 0 ? this._summary : ((this._summary = e), this)
      }
      alias(e) {
        if (e === void 0) return this._aliases[0]
        let t = this
        if (
          (this.commands.length !== 0 &&
            this.commands[this.commands.length - 1]._executableHandler &&
            (t = this.commands[this.commands.length - 1]),
          e === t._name)
        )
          throw new Error("Command alias can't be the same as its name")
        return t._aliases.push(e), this
      }
      aliases(e) {
        return e === void 0
          ? this._aliases
          : (e.forEach((t) => this.alias(t)), this)
      }
      usage(e) {
        if (e === void 0) {
          if (this._usage) return this._usage
          let t = this._args.map((r) => Dn(r))
          return []
            .concat(
              this.options.length || this._hasHelpOption ? '[options]' : [],
              this.commands.length ? '[command]' : [],
              this._args.length ? t : []
            )
            .join(' ')
        }
        return (this._usage = e), this
      }
      name(e) {
        return e === void 0 ? this._name : ((this._name = e), this)
      }
      nameFromFilename(e) {
        return (this._name = L.basename(e, L.extname(e))), this
      }
      executableDir(e) {
        return e === void 0
          ? this._executableDir
          : ((this._executableDir = e), this)
      }
      helpInformation(e) {
        let t = this.createHelp()
        return (
          t.helpWidth === void 0 &&
            (t.helpWidth =
              e && e.error
                ? this._outputConfiguration.getErrHelpWidth()
                : this._outputConfiguration.getOutHelpWidth()),
          t.formatHelp(this, t)
        )
      }
      _getHelpContext(e) {
        e = e || {}
        let t = { error: !!e.error },
          r
        return (
          t.error
            ? (r = (n) => this._outputConfiguration.writeErr(n))
            : (r = (n) => this._outputConfiguration.writeOut(n)),
          (t.write = e.write || r),
          (t.command = this),
          t
        )
      }
      outputHelp(e) {
        let t
        typeof e == 'function' && ((t = e), (e = void 0))
        let r = this._getHelpContext(e)
        Z(this)
          .reverse()
          .forEach((u) => u.emit('beforeAllHelp', r)),
          this.emit('beforeHelp', r)
        let n = this.helpInformation(r)
        if (t && ((n = t(n)), typeof n != 'string' && !Buffer.isBuffer(n)))
          throw new Error(
            'outputHelp callback must return a string or a Buffer'
          )
        r.write(n),
          this.emit(this._helpLongFlag),
          this.emit('afterHelp', r),
          Z(this).forEach((u) => u.emit('afterAllHelp', r))
      }
      helpOption(e, t) {
        if (typeof e == 'boolean') return (this._hasHelpOption = e), this
        ;(this._helpFlags = e || this._helpFlags),
          (this._helpDescription = t || this._helpDescription)
        let r = hn(this._helpFlags)
        return (
          (this._helpShortFlag = r.shortFlag),
          (this._helpLongFlag = r.longFlag),
          this
        )
      }
      help(e) {
        this.outputHelp(e)
        let t = b.exitCode || 0
        t === 0 && e && typeof e != 'function' && e.error && (t = 1),
          this._exit(t, 'commander.help', '(outputHelp)')
      }
      addHelpText(e, t) {
        let r = ['beforeAll', 'before', 'after', 'afterAll']
        if (!r.includes(e))
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`)
        let n = `${e}Help`
        return (
          this.on(n, (u) => {
            let s
            typeof t == 'function'
              ? (s = t({ error: u.error, command: u.command }))
              : (s = t),
              s &&
                u.write(`${s}
`)
          }),
          this
        )
      }
    }
  function bt(i, e) {
    i._hasHelpOption &&
      e.find((r) => r === i._helpLongFlag || r === i._helpShortFlag) &&
      (i.outputHelp(), i._exit(0, 'commander.helpDisplayed', '(outputHelp)'))
  }
  function At(i) {
    return i.map((e) => {
      if (!e.startsWith('--inspect')) return e
      let t,
        r = '127.0.0.1',
        n = '9229',
        u
      return (
        (u = e.match(/^(--inspect(-brk)?)$/)) !== null
          ? (t = u[1])
          : (u = e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null
          ? ((t = u[1]), /^\d+$/.test(u[3]) ? (n = u[3]) : (r = u[3]))
          : (u = e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !==
              null && ((t = u[1]), (r = u[3]), (n = u[4])),
        t && n !== '0' ? `${t}=${r}:${parseInt(n) + 1}` : e
      )
    })
  }
  function Z(i) {
    let e = []
    for (let t = i; t; t = t.parent) e.push(t)
    return e
  }
  _t.Command = Q
})
var St = F(($, Ot) => {
  var { Argument: fn } = pe(),
    { Command: xt } = yt(),
    { CommanderError: dn, InvalidArgumentError: wt } = J(),
    { Help: mn } = Me(),
    { Option: gn } = Ne()
  $ = Ot.exports = new xt()
  $.program = $
  $.Argument = fn
  $.Command = xt
  $.CommanderError = dn
  $.Help = mn
  $.InvalidArgumentError = wt
  $.InvalidOptionArgumentError = wt
  $.Option = gn
})
var qt = F((us, kn) => {
  kn.exports = [
    '|/-\\',
    '\u2802-\u2013\u2014\u2013-',
    '\u25D0\u25D3\u25D1\u25D2',
    '\u25F4\u25F7\u25F6\u25F5',
    '\u25F0\u25F3\u25F2\u25F1',
    '\u2596\u2598\u259D\u2597',
    '\u25A0\u25A1\u25AA\u25AB',
    '\u258C\u2580\u2590\u2584',
    '\u2589\u258A\u258B\u258C\u258D\u258E\u258F\u258E\u258D\u258C\u258B\u258A\u2589',
    '\u2581\u2583\u2584\u2585\u2586\u2587\u2588\u2587\u2586\u2585\u2584\u2583',
    '\u2190\u2196\u2191\u2197\u2192\u2198\u2193\u2199',
    '\u2524\u2518\u2534\u2514\u251C\u250C\u252C\u2510',
    '\u25E2\u25E3\u25E4\u25E5',
    '.oO\xB0Oo.',
    '.oO@*',
    ['\u{1F30D}', '\u{1F30E}', '\u{1F30F}'],
    '\u25E1\u25E1 \u2299\u2299 \u25E0\u25E0',
    '\u2631\u2632\u2634',
    '\u280B\u2819\u2839\u2838\u283C\u2834\u2826\u2827\u2807\u280F',
    '\u280B\u2819\u281A\u281E\u2816\u2826\u2834\u2832\u2833\u2813',
    '\u2804\u2806\u2807\u280B\u2819\u2838\u2830\u2820\u2830\u2838\u2819\u280B\u2807\u2806',
    '\u280B\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B',
    '\u2801\u2809\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2824\u2804\u2804\u2824\u2834\u2832\u2812\u2802\u2802\u2812\u281A\u2819\u2809\u2801',
    '\u2808\u2809\u280B\u2813\u2812\u2810\u2810\u2812\u2816\u2826\u2824\u2820\u2820\u2824\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B\u2809\u2808',
    '\u2801\u2801\u2809\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2824\u2804\u2804\u2824\u2820\u2820\u2824\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B\u2809\u2808\u2808',
    '\u2884\u2882\u2881\u2841\u2848\u2850\u2860',
    '\u28B9\u28BA\u28BC\u28F8\u28C7\u2867\u2857\u284F',
    '\u28FE\u28FD\u28FB\u28BF\u287F\u28DF\u28EF\u28F7',
    '\u2801\u2802\u2804\u2840\u2880\u2820\u2810\u2808',
    [
      '\u{1F311}',
      '\u{1F312}',
      '\u{1F313}',
      '\u{1F314}',
      '\u{1F315}',
      '\u{1F31D}',
      '\u{1F316}',
      '\u{1F317}',
      '\u{1F318}',
      '\u{1F31A}',
    ],
    [
      '\u{1F55B}',
      '\u{1F550}',
      '\u{1F551}',
      '\u{1F552}',
      '\u{1F553}',
      '\u{1F554}',
      '\u{1F555}',
      '\u{1F556}',
      '\u{1F557}',
      '\u{1F558}',
      '\u{1F559}',
      '\u{1F55A}',
    ],
  ]
})
var zt = F((Yt) => {
  var Pt = require('readline'),
    Ut = 0,
    Gt = 60
  function $n(i) {
    this.clearLine(this.stream), this.stream.write(i)
  }
  var S = function (i) {
    if (!(this instanceof S)) return new S(i)
    typeof i == 'string' ? (i = { text: i }) : i || (i = {}),
      (this.text = i.text || ''),
      this.setSpinnerString(Ut),
      this.setSpinnerDelay(Gt),
      (this.onTick = i.onTick || $n),
      (this.stream = i.stream || process.stdout)
  }
  S.spinners = qt()
  S.setDefaultSpinnerString = function (i) {
    return (Ut = i), this
  }
  S.setDefaultSpinnerDelay = function (i) {
    return (Gt = i), this
  }
  S.prototype.start = function () {
    if (this.stream === process.stdout && this.stream.isTTY !== !0) return this
    var i = 0,
      e = this,
      t = function () {
        var r =
          e.text.indexOf('%s') > -1
            ? e.text.replace('%s', e.chars[i])
            : e.chars[i] + ' ' + e.text
        e.onTick(r), (i = ++i % e.chars.length)
      }
    return t(), (this.id = setInterval(t, this.delay)), this
  }
  S.prototype.isSpinning = function () {
    return this.id !== void 0
  }
  S.prototype.setSpinnerDelay = function (i) {
    return (this.delay = i), this
  }
  S.prototype.setSpinnerString = function (i) {
    let e = In(i, this.spinners)
    return (this.chars = Array.isArray(e) ? e : e.split('')), this
  }
  S.prototype.setSpinnerTitle = function (i) {
    return (this.text = i), this
  }
  S.prototype.stop = function (i) {
    return this.isSpinning === !1
      ? this
      : (clearInterval(this.id),
        (this.id = void 0),
        i && this.clearLine(this.stream),
        this)
  }
  S.prototype.clearLine = function (i) {
    return Pt.clearLine(i, 0), Pt.cursorTo(i, 0), this
  }
  function Rn(i) {
    return typeof i == 'number' && i % 1 === 0
  }
  function In(i, e) {
    if (!Rn(i)) return i + ''
    var t = S.spinners.length
    return (i = i >= t ? 0 : i), (i = i < 0 ? t + i : i), S.spinners[i]
  }
  Yt.Spinner = S
})
var ye = F((to, Ar) => {
  var et = [],
    br = 0,
    w = (i, e) => {
      br >= e && et.push(i)
    }
  w.WARN = 1
  w.INFO = 2
  w.DEBUG = 3
  w.reset = () => {
    et = []
  }
  w.setDebugLevel = (i) => {
    br = i
  }
  w.warn = (i) => w(i, w.WARN)
  w.info = (i) => w(i, w.INFO)
  w.debug = (i) => w(i, w.DEBUG)
  w.debugMessages = () => et
  Ar.exports = w
})
var yr = F((ro, _r) => {
  'use strict'
  _r.exports = ({ onlyFirst: i = !1 } = {}) => {
    let e = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|')
    return new RegExp(e, i ? void 0 : 'g')
  }
})
var wr = F((io, xr) => {
  'use strict'
  var Ln = yr()
  xr.exports = (i) => (typeof i == 'string' ? i.replace(Ln(), '') : i)
})
var Sr = F((no, tt) => {
  'use strict'
  var Or = (i) =>
    Number.isNaN(i)
      ? !1
      : i >= 4352 &&
        (i <= 4447 ||
          i === 9001 ||
          i === 9002 ||
          (11904 <= i && i <= 12871 && i !== 12351) ||
          (12880 <= i && i <= 19903) ||
          (19968 <= i && i <= 42182) ||
          (43360 <= i && i <= 43388) ||
          (44032 <= i && i <= 55203) ||
          (63744 <= i && i <= 64255) ||
          (65040 <= i && i <= 65049) ||
          (65072 <= i && i <= 65131) ||
          (65281 <= i && i <= 65376) ||
          (65504 <= i && i <= 65510) ||
          (110592 <= i && i <= 110593) ||
          (127488 <= i && i <= 127569) ||
          (131072 <= i && i <= 262141))
  tt.exports = Or
  tt.exports.default = Or
})
var Br = F((uo, vr) => {
  'use strict'
  vr.exports = function () {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g
  }
})
var kr = F((so, rt) => {
  'use strict'
  var Nn = wr(),
    jn = Sr(),
    Hn = Br(),
    Tr = (i) => {
      if (
        typeof i != 'string' ||
        i.length === 0 ||
        ((i = Nn(i)), i.length === 0)
      )
        return 0
      i = i.replace(Hn(), '  ')
      let e = 0
      for (let t = 0; t < i.length; t++) {
        let r = i.codePointAt(t)
        r <= 31 ||
          (r >= 127 && r <= 159) ||
          (r >= 768 && r <= 879) ||
          (r > 65535 && t++, (e += jn(r) ? 2 : 1))
      }
      return e
    }
  rt.exports = Tr
  rt.exports.default = Tr
})
var it = F((oo, Mr) => {
  var $r = kr()
  function xe(i) {
    return i ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g
  }
  function V(i) {
    let e = xe()
    return ('' + i)
      .replace(e, '')
      .split(
        `
`
      )
      .reduce(function (n, u) {
        return $r(u) > n ? $r(u) : n
      }, 0)
  }
  function ne(i, e) {
    return Array(e + 1).join(i)
  }
  function Wn(i, e, t, r) {
    let n = V(i)
    if (e + 1 >= n) {
      let u = e - n
      switch (r) {
        case 'right': {
          i = ne(t, u) + i
          break
        }
        case 'center': {
          let s = Math.ceil(u / 2),
            l = u - s
          i = ne(t, l) + i + ne(t, s)
          break
        }
        default: {
          i = i + ne(t, u)
          break
        }
      }
    }
    return i
  }
  var Y = {}
  function ue(i, e, t) {
    ;(e = '\x1B[' + e + 'm'),
      (t = '\x1B[' + t + 'm'),
      (Y[e] = { set: i, to: !0 }),
      (Y[t] = { set: i, to: !1 }),
      (Y[i] = { on: e, off: t })
  }
  ue('bold', 1, 22)
  ue('italics', 3, 23)
  ue('underline', 4, 24)
  ue('inverse', 7, 27)
  ue('strikethrough', 9, 29)
  function Rr(i, e) {
    let t = e[1] ? parseInt(e[1].split(';')[0]) : 0
    if ((t >= 30 && t <= 39) || (t >= 90 && t <= 97)) {
      i.lastForegroundAdded = e[0]
      return
    }
    if ((t >= 40 && t <= 49) || (t >= 100 && t <= 107)) {
      i.lastBackgroundAdded = e[0]
      return
    }
    if (t === 0) {
      for (let n in i) Object.prototype.hasOwnProperty.call(i, n) && delete i[n]
      return
    }
    let r = Y[e[0]]
    r && (i[r.set] = r.to)
  }
  function qn(i) {
    let e = xe(!0),
      t = e.exec(i),
      r = {}
    for (; t !== null; ) Rr(r, t), (t = e.exec(i))
    return r
  }
  function Ir(i, e) {
    let t = i.lastBackgroundAdded,
      r = i.lastForegroundAdded
    return (
      delete i.lastBackgroundAdded,
      delete i.lastForegroundAdded,
      Object.keys(i).forEach(function (n) {
        i[n] && (e += Y[n].off)
      }),
      t && t != '\x1B[49m' && (e += '\x1B[49m'),
      r && r != '\x1B[39m' && (e += '\x1B[39m'),
      e
    )
  }
  function Pn(i, e) {
    let t = i.lastBackgroundAdded,
      r = i.lastForegroundAdded
    return (
      delete i.lastBackgroundAdded,
      delete i.lastForegroundAdded,
      Object.keys(i).forEach(function (n) {
        i[n] && (e = Y[n].on + e)
      }),
      t && t != '\x1B[49m' && (e = t + e),
      r && r != '\x1B[39m' && (e = r + e),
      e
    )
  }
  function Un(i, e) {
    if (i.length === V(i)) return i.substr(0, e)
    for (; V(i) > e; ) i = i.slice(0, -1)
    return i
  }
  function Gn(i, e) {
    let t = xe(!0),
      r = i.split(xe()),
      n = 0,
      u = 0,
      s = '',
      l,
      o = {}
    for (; u < e; ) {
      l = t.exec(i)
      let a = r[n]
      if (
        (n++, u + V(a) > e && (a = Un(a, e - u)), (s += a), (u += V(a)), u < e)
      ) {
        if (!l) break
        ;(s += l[0]), Rr(o, l)
      }
    }
    return Ir(o, s)
  }
  function Yn(i, e, t) {
    return (t = t || '\u2026'), V(i) <= e ? i : ((e -= V(t)), Gn(i, e) + t)
  }
  function zn() {
    return {
      chars: {
        top: '\u2500',
        'top-mid': '\u252C',
        'top-left': '\u250C',
        'top-right': '\u2510',
        bottom: '\u2500',
        'bottom-mid': '\u2534',
        'bottom-left': '\u2514',
        'bottom-right': '\u2518',
        left: '\u2502',
        'left-mid': '\u251C',
        mid: '\u2500',
        'mid-mid': '\u253C',
        right: '\u2502',
        'right-mid': '\u2524',
        middle: '\u2502',
      },
      truncate: '\u2026',
      colWidths: [],
      rowHeights: [],
      colAligns: [],
      rowAligns: [],
      style: {
        'padding-left': 1,
        'padding-right': 1,
        head: ['red'],
        border: ['grey'],
        compact: !1,
      },
      head: [],
    }
  }
  function Kn(i, e) {
    ;(i = i || {}), (e = e || zn())
    let t = Object.assign({}, e, i)
    return (
      (t.chars = Object.assign({}, e.chars, i.chars)),
      (t.style = Object.assign({}, e.style, i.style)),
      t
    )
  }
  function Jn(i, e) {
    let t = [],
      r = e.split(/(\s+)/g),
      n = [],
      u = 0,
      s
    for (let l = 0; l < r.length; l += 2) {
      let o = r[l],
        a = u + V(o)
      u > 0 && s && (a += s.length),
        a > i
          ? (u !== 0 && t.push(n.join('')), (n = [o]), (u = V(o)))
          : (n.push(s || '', o), (u = a)),
        (s = r[l + 1])
    }
    return u && t.push(n.join('')), t
  }
  function Zn(i, e) {
    let t = [],
      r = ''
    function n(s, l) {
      for (r.length && l && (r += l), r += s; r.length > i; )
        t.push(r.slice(0, i)), (r = r.slice(i))
    }
    let u = e.split(/(\s+)/g)
    for (let s = 0; s < u.length; s += 2) n(u[s], s && u[s - 1])
    return r.length && t.push(r), t
  }
  function Qn(i, e, t = !0) {
    let r = []
    e = e.split(`
`)
    let n = t ? Jn : Zn
    for (let u = 0; u < e.length; u++) r.push.apply(r, n(i, e[u]))
    return r
  }
  function Xn(i) {
    let e = {},
      t = []
    for (let r = 0; r < i.length; r++) {
      let n = Pn(e, i[r])
      e = qn(n)
      let u = Object.assign({}, e)
      t.push(Ir(u, n))
    }
    return t
  }
  function eu(i, e) {
    let t = '\x1B]',
      r = '\x07',
      n = ';'
    return [t, '8', n, n, i || e, r, e, t, '8', n, n, r].join('')
  }
  Mr.exports = {
    strlen: V,
    repeat: ne,
    pad: Wn,
    truncate: Yn,
    mergeOptions: Kn,
    wordWrap: Qn,
    colorizeLines: Xn,
    hyperlink: eu,
  }
})
var jr = F((ao, Nr) => {
  var Lr = {}
  Nr.exports = Lr
  var Vr = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49],
  }
  Object.keys(Vr).forEach(function (i) {
    var e = Vr[i],
      t = (Lr[i] = [])
    ;(t.open = '\x1B[' + e[0] + 'm'), (t.close = '\x1B[' + e[1] + 'm')
  })
})
var Wr = F((lo, Hr) => {
  'use strict'
  Hr.exports = function (i, e) {
    e = e || process.argv
    var t = e.indexOf('--'),
      r = /^-{1,2}/.test(i) ? '' : '--',
      n = e.indexOf(r + i)
    return n !== -1 && (t === -1 ? !0 : n < t)
  }
})
var Pr = F((Do, qr) => {
  'use strict'
  var tu = require('os'),
    I = Wr(),
    v = process.env,
    z = void 0
  I('no-color') || I('no-colors') || I('color=false')
    ? (z = !1)
    : (I('color') || I('colors') || I('color=true') || I('color=always')) &&
      (z = !0)
  'FORCE_COLOR' in v &&
    (z = v.FORCE_COLOR.length === 0 || parseInt(v.FORCE_COLOR, 10) !== 0)
  function ru(i) {
    return i === 0
      ? !1
      : { level: i, hasBasic: !0, has256: i >= 2, has16m: i >= 3 }
  }
  function iu(i) {
    if (z === !1) return 0
    if (I('color=16m') || I('color=full') || I('color=truecolor')) return 3
    if (I('color=256')) return 2
    if (i && !i.isTTY && z !== !0) return 0
    var e = z ? 1 : 0
    if (process.platform === 'win32') {
      var t = tu.release().split('.')
      return Number(process.versions.node.split('.')[0]) >= 8 &&
        Number(t[0]) >= 10 &&
        Number(t[2]) >= 10586
        ? Number(t[2]) >= 14931
          ? 3
          : 2
        : 1
    }
    if ('CI' in v)
      return ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function (n) {
        return n in v
      }) || v.CI_NAME === 'codeship'
        ? 1
        : e
    if ('TEAMCITY_VERSION' in v)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(v.TEAMCITY_VERSION) ? 1 : 0
    if ('TERM_PROGRAM' in v) {
      var r = parseInt((v.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
      switch (v.TERM_PROGRAM) {
        case 'iTerm.app':
          return r >= 3 ? 3 : 2
        case 'Hyper':
          return 3
        case 'Apple_Terminal':
          return 2
      }
    }
    return /-256(color)?$/i.test(v.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(v.TERM) ||
        'COLORTERM' in v
      ? 1
      : (v.TERM === 'dumb', e)
  }
  function nt(i) {
    var e = iu(i)
    return ru(e)
  }
  qr.exports = {
    supportsColor: nt,
    stdout: nt(process.stdout),
    stderr: nt(process.stderr),
  }
})
var Gr = F((co, Ur) => {
  Ur.exports = function (e, t) {
    var r = ''
    ;(e = e || 'Run the trap, drop the bass'), (e = e.split(''))
    var n = {
      a: ['@', '\u0104', '\u023A', '\u0245', '\u0394', '\u039B', '\u0414'],
      b: ['\xDF', '\u0181', '\u0243', '\u026E', '\u03B2', '\u0E3F'],
      c: ['\xA9', '\u023B', '\u03FE'],
      d: ['\xD0', '\u018A', '\u0500', '\u0501', '\u0502', '\u0503'],
      e: [
        '\xCB',
        '\u0115',
        '\u018E',
        '\u0258',
        '\u03A3',
        '\u03BE',
        '\u04BC',
        '\u0A6C',
      ],
      f: ['\u04FA'],
      g: ['\u0262'],
      h: ['\u0126', '\u0195', '\u04A2', '\u04BA', '\u04C7', '\u050A'],
      i: ['\u0F0F'],
      j: ['\u0134'],
      k: ['\u0138', '\u04A0', '\u04C3', '\u051E'],
      l: ['\u0139'],
      m: ['\u028D', '\u04CD', '\u04CE', '\u0520', '\u0521', '\u0D69'],
      n: ['\xD1', '\u014B', '\u019D', '\u0376', '\u03A0', '\u048A'],
      o: [
        '\xD8',
        '\xF5',
        '\xF8',
        '\u01FE',
        '\u0298',
        '\u047A',
        '\u05DD',
        '\u06DD',
        '\u0E4F',
      ],
      p: ['\u01F7', '\u048E'],
      q: ['\u09CD'],
      r: ['\xAE', '\u01A6', '\u0210', '\u024C', '\u0280', '\u042F'],
      s: ['\xA7', '\u03DE', '\u03DF', '\u03E8'],
      t: ['\u0141', '\u0166', '\u0373'],
      u: ['\u01B1', '\u054D'],
      v: ['\u05D8'],
      w: ['\u0428', '\u0460', '\u047C', '\u0D70'],
      x: ['\u04B2', '\u04FE', '\u04FC', '\u04FD'],
      y: ['\xA5', '\u04B0', '\u04CB'],
      z: ['\u01B5', '\u0240'],
    }
    return (
      e.forEach(function (u) {
        u = u.toLowerCase()
        var s = n[u] || [' '],
          l = Math.floor(Math.random() * s.length)
        typeof n[u] < 'u' ? (r += n[u][l]) : (r += u)
      }),
      r
    )
  }
})
var zr = F((ho, Yr) => {
  Yr.exports = function (e, t) {
    e = e || '   he is here   '
    var r = {
        up: [
          '\u030D',
          '\u030E',
          '\u0304',
          '\u0305',
          '\u033F',
          '\u0311',
          '\u0306',
          '\u0310',
          '\u0352',
          '\u0357',
          '\u0351',
          '\u0307',
          '\u0308',
          '\u030A',
          '\u0342',
          '\u0313',
          '\u0308',
          '\u034A',
          '\u034B',
          '\u034C',
          '\u0303',
          '\u0302',
          '\u030C',
          '\u0350',
          '\u0300',
          '\u0301',
          '\u030B',
          '\u030F',
          '\u0312',
          '\u0313',
          '\u0314',
          '\u033D',
          '\u0309',
          '\u0363',
          '\u0364',
          '\u0365',
          '\u0366',
          '\u0367',
          '\u0368',
          '\u0369',
          '\u036A',
          '\u036B',
          '\u036C',
          '\u036D',
          '\u036E',
          '\u036F',
          '\u033E',
          '\u035B',
          '\u0346',
          '\u031A',
        ],
        down: [
          '\u0316',
          '\u0317',
          '\u0318',
          '\u0319',
          '\u031C',
          '\u031D',
          '\u031E',
          '\u031F',
          '\u0320',
          '\u0324',
          '\u0325',
          '\u0326',
          '\u0329',
          '\u032A',
          '\u032B',
          '\u032C',
          '\u032D',
          '\u032E',
          '\u032F',
          '\u0330',
          '\u0331',
          '\u0332',
          '\u0333',
          '\u0339',
          '\u033A',
          '\u033B',
          '\u033C',
          '\u0345',
          '\u0347',
          '\u0348',
          '\u0349',
          '\u034D',
          '\u034E',
          '\u0353',
          '\u0354',
          '\u0355',
          '\u0356',
          '\u0359',
          '\u035A',
          '\u0323',
        ],
        mid: [
          '\u0315',
          '\u031B',
          '\u0300',
          '\u0301',
          '\u0358',
          '\u0321',
          '\u0322',
          '\u0327',
          '\u0328',
          '\u0334',
          '\u0335',
          '\u0336',
          '\u035C',
          '\u035D',
          '\u035E',
          '\u035F',
          '\u0360',
          '\u0362',
          '\u0338',
          '\u0337',
          '\u0361',
          ' \u0489',
        ],
      },
      n = [].concat(r.up, r.down, r.mid)
    function u(o) {
      var a = Math.floor(Math.random() * o)
      return a
    }
    function s(o) {
      var a = !1
      return (
        n.filter(function (c) {
          a = c === o
        }),
        a
      )
    }
    function l(o, a) {
      var c = '',
        f,
        g
      ;(a = a || {}),
        (a.up = typeof a.up < 'u' ? a.up : !0),
        (a.mid = typeof a.mid < 'u' ? a.mid : !0),
        (a.down = typeof a.down < 'u' ? a.down : !0),
        (a.size = typeof a.size < 'u' ? a.size : 'maxi'),
        (o = o.split(''))
      for (g in o)
        if (!s(g)) {
          switch (((c = c + o[g]), (f = { up: 0, down: 0, mid: 0 }), a.size)) {
            case 'mini':
              ;(f.up = u(8)), (f.mid = u(2)), (f.down = u(8))
              break
            case 'maxi':
              ;(f.up = u(16) + 3), (f.mid = u(4) + 1), (f.down = u(64) + 3)
              break
            default:
              ;(f.up = u(8) + 1), (f.mid = u(6) / 2), (f.down = u(8) + 1)
              break
          }
          var h = ['up', 'mid', 'down']
          for (var D in h)
            for (var p = h[D], d = 0; d <= f[p]; d++)
              a[p] && (c = c + r[p][u(r[p].length)])
        }
      return c
    }
    return l(e, t)
  }
})
var Jr = F((po, Kr) => {
  Kr.exports = function (i) {
    return function (e, t, r) {
      if (e === ' ') return e
      switch (t % 3) {
        case 0:
          return i.red(e)
        case 1:
          return i.white(e)
        case 2:
          return i.blue(e)
      }
    }
  }
})
var Qr = F((fo, Zr) => {
  Zr.exports = function (i) {
    return function (e, t, r) {
      return t % 2 === 0 ? e : i.inverse(e)
    }
  }
})
var ei = F((mo, Xr) => {
  Xr.exports = function (i) {
    var e = ['red', 'yellow', 'green', 'blue', 'magenta']
    return function (t, r, n) {
      return t === ' ' ? t : i[e[r++ % e.length]](t)
    }
  }
})
var ri = F((go, ti) => {
  ti.exports = function (i) {
    var e = [
      'underline',
      'inverse',
      'grey',
      'yellow',
      'red',
      'green',
      'blue',
      'white',
      'cyan',
      'magenta',
      'brightYellow',
      'brightRed',
      'brightGreen',
      'brightBlue',
      'brightWhite',
      'brightCyan',
      'brightMagenta',
    ]
    return function (t, r, n) {
      return t === ' ' ? t : i[e[Math.round(Math.random() * (e.length - 2))]](t)
    }
  }
})
var ai = F((Fo, oi) => {
  var m = {}
  oi.exports = m
  m.themes = {}
  var nu = require('util'),
    W = (m.styles = jr()),
    ni = Object.defineProperties,
    uu = new RegExp(/[\r\n]+/g)
  m.supportsColor = Pr().supportsColor
  typeof m.enabled > 'u' && (m.enabled = m.supportsColor() !== !1)
  m.enable = function () {
    m.enabled = !0
  }
  m.disable = function () {
    m.enabled = !1
  }
  m.stripColors = m.strip = function (i) {
    return ('' + i).replace(/\x1B\[\d+m/g, '')
  }
  var Co = (m.stylize = function (e, t) {
      if (!m.enabled) return e + ''
      var r = W[t]
      return !r && t in m ? m[t](e) : r.open + e + r.close
    }),
    su = /[|\\{}()[\]^$+*?.]/g,
    ou = function (i) {
      if (typeof i != 'string') throw new TypeError('Expected a string')
      return i.replace(su, '\\$&')
    }
  function ui(i) {
    var e = function t() {
      return lu.apply(t, arguments)
    }
    return (e._styles = i), (e.__proto__ = au), e
  }
  var si = (function () {
      var i = {}
      return (
        (W.grey = W.gray),
        Object.keys(W).forEach(function (e) {
          ;(W[e].closeRe = new RegExp(ou(W[e].close), 'g')),
            (i[e] = {
              get: function () {
                return ui(this._styles.concat(e))
              },
            })
        }),
        i
      )
    })(),
    au = ni(function () {}, si)
  function lu() {
    var i = Array.prototype.slice.call(arguments),
      e = i
        .map(function (s) {
          return s != null && s.constructor === String ? s : nu.inspect(s)
        })
        .join(' ')
    if (!m.enabled || !e) return e
    for (
      var t =
          e.indexOf(`
`) != -1,
        r = this._styles,
        n = r.length;
      n--;

    ) {
      var u = W[r[n]]
      ;(e = u.open + e.replace(u.closeRe, u.open) + u.close),
        t &&
          (e = e.replace(uu, function (s) {
            return u.close + s + u.open
          }))
    }
    return e
  }
  m.setTheme = function (i) {
    if (typeof i == 'string') {
      console.log(
        "colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));"
      )
      return
    }
    for (var e in i)
      (function (t) {
        m[t] = function (r) {
          if (typeof i[t] == 'object') {
            var n = r
            for (var u in i[t]) n = m[i[t][u]](n)
            return n
          }
          return m[i[t]](r)
        }
      })(e)
  }
  function Du() {
    var i = {}
    return (
      Object.keys(si).forEach(function (e) {
        i[e] = {
          get: function () {
            return ui([e])
          },
        }
      }),
      i
    )
  }
  var cu = function (e, t) {
    var r = t.split('')
    return (r = r.map(e)), r.join('')
  }
  m.trap = Gr()
  m.zalgo = zr()
  m.maps = {}
  m.maps.america = Jr()(m)
  m.maps.zebra = Qr()(m)
  m.maps.rainbow = ei()(m)
  m.maps.random = ri()(m)
  for (ii in m.maps)
    (function (i) {
      m[i] = function (e) {
        return cu(m.maps[i], e)
      }
    })(ii)
  var ii
  ni(m, Du())
})
var Di = F((Eo, li) => {
  var hu = ai()
  li.exports = hu
})
var fi = F((bo, we) => {
  var { info: pu, debug: pi } = ye(),
    T = it(),
    q = class {
      constructor(e) {
        this.setOptions(e), (this.x = null), (this.y = null)
      }
      setOptions(e) {
        ;['boolean', 'number', 'string'].indexOf(typeof e) !== -1 &&
          (e = { content: '' + e }),
          (e = e || {}),
          (this.options = e)
        let t = e.content
        if (['boolean', 'number', 'string'].indexOf(typeof t) !== -1)
          this.content = String(t)
        else if (!t) this.content = this.options.href || ''
        else
          throw new Error('Content needs to be a primitive, got: ' + typeof t)
        ;(this.colSpan = e.colSpan || 1),
          (this.rowSpan = e.rowSpan || 1),
          this.options.href &&
            Object.defineProperty(this, 'href', {
              get() {
                return this.options.href
              },
            })
      }
      mergeTableOptions(e, t) {
        this.cells = t
        let r = this.options.chars || {},
          n = e.chars,
          u = (this.chars = {})
        du.forEach(function (o) {
          ut(r, n, o, u)
        }),
          (this.truncate = this.options.truncate || e.truncate)
        let s = (this.options.style = this.options.style || {}),
          l = e.style
        ut(s, l, 'padding-left', this),
          ut(s, l, 'padding-right', this),
          (this.head = s.head || l.head),
          (this.border = s.border || l.border),
          (this.fixedWidth = e.colWidths[this.x]),
          (this.lines = this.computeLines(e)),
          (this.desiredWidth =
            T.strlen(this.content) + this.paddingLeft + this.paddingRight),
          (this.desiredHeight = this.lines.length)
      }
      computeLines(e) {
        let t = e.wordWrap || e.textWrap,
          { wordWrap: r = t } = this.options
        if (this.fixedWidth && r) {
          if (
            ((this.fixedWidth -= this.paddingLeft + this.paddingRight),
            this.colSpan)
          ) {
            let s = 1
            for (; s < this.colSpan; )
              (this.fixedWidth += e.colWidths[this.x + s]), s++
          }
          let { wrapOnWordBoundary: n = !0 } = e,
            { wrapOnWordBoundary: u = n } = this.options
          return this.wrapLines(T.wordWrap(this.fixedWidth, this.content, u))
        }
        return this.wrapLines(
          this.content.split(`
`)
        )
      }
      wrapLines(e) {
        let t = T.colorizeLines(e)
        return this.href ? t.map((r) => T.hyperlink(this.href, r)) : t
      }
      init(e) {
        let t = this.x,
          r = this.y
        ;(this.widths = e.colWidths.slice(t, t + this.colSpan)),
          (this.heights = e.rowHeights.slice(r, r + this.rowSpan)),
          (this.width = this.widths.reduce(hi, -1)),
          (this.height = this.heights.reduce(hi, -1)),
          (this.hAlign = this.options.hAlign || e.colAligns[t]),
          (this.vAlign = this.options.vAlign || e.rowAligns[r]),
          (this.drawRight = t + this.colSpan == e.colWidths.length)
      }
      draw(e, t) {
        if (e == 'top') return this.drawTop(this.drawRight)
        if (e == 'bottom') return this.drawBottom(this.drawRight)
        let r = T.truncate(this.content, 10, this.truncate)
        e ||
          pu(
            `${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${r}`
          )
        let n = Math.max(this.height - this.lines.length, 0),
          u
        switch (this.vAlign) {
          case 'center':
            u = Math.ceil(n / 2)
            break
          case 'bottom':
            u = n
            break
          default:
            u = 0
        }
        if (e < u || e >= u + this.lines.length)
          return this.drawEmpty(this.drawRight, t)
        let s = this.lines.length > this.height && e + 1 >= this.height
        return this.drawLine(e - u, this.drawRight, s, t)
      }
      drawTop(e) {
        let t = []
        return (
          this.cells
            ? this.widths.forEach(function (r, n) {
                t.push(this._topLeftChar(n)),
                  t.push(T.repeat(this.chars[this.y == 0 ? 'top' : 'mid'], r))
              }, this)
            : (t.push(this._topLeftChar(0)),
              t.push(
                T.repeat(this.chars[this.y == 0 ? 'top' : 'mid'], this.width)
              )),
          e && t.push(this.chars[this.y == 0 ? 'topRight' : 'rightMid']),
          this.wrapWithStyleColors('border', t.join(''))
        )
      }
      _topLeftChar(e) {
        let t = this.x + e,
          r
        if (this.y == 0) r = t == 0 ? 'topLeft' : e == 0 ? 'topMid' : 'top'
        else if (t == 0) r = 'leftMid'
        else if (
          ((r = e == 0 ? 'midMid' : 'bottomMid'),
          this.cells &&
            (this.cells[this.y - 1][t] instanceof q.ColSpanCell &&
              (r = e == 0 ? 'topMid' : 'mid'),
            e == 0))
        ) {
          let u = 1
          for (; this.cells[this.y][t - u] instanceof q.ColSpanCell; ) u++
          this.cells[this.y][t - u] instanceof q.RowSpanCell && (r = 'leftMid')
        }
        return this.chars[r]
      }
      wrapWithStyleColors(e, t) {
        if (this[e] && this[e].length)
          try {
            let r = Di()
            for (let n = this[e].length - 1; n >= 0; n--) r = r[this[e][n]]
            return r(t)
          } catch {
            return t
          }
        else return t
      }
      drawLine(e, t, r, n) {
        let u = this.chars[this.x == 0 ? 'left' : 'middle']
        if (this.x && n && this.cells) {
          let g = this.cells[this.y + n][this.x - 1]
          for (; g instanceof se; ) g = this.cells[g.y][g.x - 1]
          g instanceof oe || (u = this.chars.rightMid)
        }
        let s = T.repeat(' ', this.paddingLeft),
          l = t ? this.chars.right : '',
          o = T.repeat(' ', this.paddingRight),
          a = this.lines[e],
          c = this.width - (this.paddingLeft + this.paddingRight)
        r && (a += this.truncate || '\u2026')
        let f = T.truncate(a, c, this.truncate)
        return (
          (f = T.pad(f, c, ' ', this.hAlign)),
          (f = s + f + o),
          this.stylizeLine(u, f, l)
        )
      }
      stylizeLine(e, t, r) {
        return (
          (e = this.wrapWithStyleColors('border', e)),
          (r = this.wrapWithStyleColors('border', r)),
          this.y === 0 && (t = this.wrapWithStyleColors('head', t)),
          e + t + r
        )
      }
      drawBottom(e) {
        let t = this.chars[this.x == 0 ? 'bottomLeft' : 'bottomMid'],
          r = T.repeat(this.chars.bottom, this.width),
          n = e ? this.chars.bottomRight : ''
        return this.wrapWithStyleColors('border', t + r + n)
      }
      drawEmpty(e, t) {
        let r = this.chars[this.x == 0 ? 'left' : 'middle']
        if (this.x && t && this.cells) {
          let s = this.cells[this.y + t][this.x - 1]
          for (; s instanceof se; ) s = this.cells[s.y][s.x - 1]
          s instanceof oe || (r = this.chars.rightMid)
        }
        let n = e ? this.chars.right : '',
          u = T.repeat(' ', this.width)
        return this.stylizeLine(r, u, n)
      }
    },
    se = class {
      constructor() {}
      draw(e) {
        return (
          typeof e == 'number' && pi(`${this.y}-${this.x}: 1x1 ColSpanCell`), ''
        )
      }
      init() {}
      mergeTableOptions() {}
    },
    oe = class {
      constructor(e) {
        this.originalCell = e
      }
      init(e) {
        let t = this.y,
          r = this.originalCell.y
        ;(this.cellOffset = t - r),
          (this.offset = fu(e.rowHeights, r, this.cellOffset))
      }
      draw(e) {
        return e == 'top'
          ? this.originalCell.draw(this.offset, this.cellOffset)
          : e == 'bottom'
          ? this.originalCell.draw('bottom')
          : (pi(
              `${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`
            ),
            this.originalCell.draw(this.offset + 1 + e))
      }
      mergeTableOptions() {}
    }
  function ci(...i) {
    return i.filter((e) => e != null).shift()
  }
  function ut(i, e, t, r) {
    let n = t.split('-')
    n.length > 1
      ? ((n[1] = n[1].charAt(0).toUpperCase() + n[1].substr(1)),
        (n = n.join('')),
        (r[n] = ci(i[n], i[t], e[n], e[t])))
      : (r[t] = ci(i[t], e[t]))
  }
  function fu(i, e, t) {
    let r = i[e]
    for (let n = 1; n < t; n++) r += 1 + i[e + n]
    return r
  }
  function hi(i, e) {
    return i + e + 1
  }
  var du = [
    'top',
    'top-mid',
    'top-left',
    'top-right',
    'bottom',
    'bottom-mid',
    'bottom-left',
    'bottom-right',
    'left',
    'left-mid',
    'mid',
    'mid-mid',
    'right',
    'right-mid',
    'middle',
  ]
  we.exports = q
  we.exports.ColSpanCell = se
  we.exports.RowSpanCell = oe
})
var gi = F((Ao, mi) => {
  var { warn: mu, debug: gu } = ye(),
    st = fi(),
    { ColSpanCell: Cu, RowSpanCell: Fu } = st
  ;(function () {
    function i(h, D) {
      return h[D] > 0 ? i(h, D + 1) : D
    }
    function e(h) {
      let D = {}
      h.forEach(function (p, d) {
        let E = 0
        p.forEach(function (C) {
          ;(C.y = d), (C.x = d ? i(D, E) : E)
          let O = C.rowSpan || 1,
            B = C.colSpan || 1
          if (O > 1) for (let K = 0; K < B; K++) D[C.x + K] = O
          E = C.x + B
        }),
          Object.keys(D).forEach((C) => {
            D[C]--, D[C] < 1 && delete D[C]
          })
      })
    }
    function t(h) {
      let D = 0
      return (
        h.forEach(function (p) {
          p.forEach(function (d) {
            D = Math.max(D, d.x + (d.colSpan || 1))
          })
        }),
        D
      )
    }
    function r(h) {
      return h.length
    }
    function n(h, D) {
      let p = h.y,
        d = h.y - 1 + (h.rowSpan || 1),
        E = D.y,
        C = D.y - 1 + (D.rowSpan || 1),
        O = !(p > C || E > d),
        B = h.x,
        K = h.x - 1 + (h.colSpan || 1),
        Ii = D.x,
        Mi = D.x - 1 + (D.colSpan || 1),
        Vi = !(B > Mi || Ii > K)
      return O && Vi
    }
    function u(h, D, p) {
      let d = Math.min(h.length - 1, p),
        E = { x: D, y: p }
      for (let C = 0; C <= d; C++) {
        let O = h[C]
        for (let B = 0; B < O.length; B++) if (n(E, O[B])) return !0
      }
      return !1
    }
    function s(h, D, p, d) {
      for (let E = p; E < d; E++) if (u(h, E, D)) return !1
      return !0
    }
    function l(h) {
      h.forEach(function (D, p) {
        D.forEach(function (d) {
          for (let E = 1; E < d.rowSpan; E++) {
            let C = new Fu(d)
            ;(C.x = d.x),
              (C.y = d.y + E),
              (C.colSpan = d.colSpan),
              a(C, h[p + E])
          }
        })
      })
    }
    function o(h) {
      for (let D = h.length - 1; D >= 0; D--) {
        let p = h[D]
        for (let d = 0; d < p.length; d++) {
          let E = p[d]
          for (let C = 1; C < E.colSpan; C++) {
            let O = new Cu()
            ;(O.x = E.x + C), (O.y = E.y), p.splice(d + 1, 0, O)
          }
        }
      }
    }
    function a(h, D) {
      let p = 0
      for (; p < D.length && D[p].x < h.x; ) p++
      D.splice(p, 0, h)
    }
    function c(h) {
      let D = r(h),
        p = t(h)
      gu(`Max rows: ${D}; Max cols: ${p}`)
      for (let d = 0; d < D; d++)
        for (let E = 0; E < p; E++)
          if (!u(h, E, d)) {
            let C = { x: E, y: d, colSpan: 1, rowSpan: 1 }
            for (E++; E < p && !u(h, E, d); ) C.colSpan++, E++
            let O = d + 1
            for (; O < D && s(h, O, C.x, C.x + C.colSpan); ) C.rowSpan++, O++
            let B = new st(C)
            ;(B.x = C.x),
              (B.y = C.y),
              mu(`Missing cell at ${B.y}-${B.x}.`),
              a(B, h[d])
          }
    }
    function f(h) {
      return h.map(function (D) {
        if (!Array.isArray(D)) {
          let p = Object.keys(D)[0]
          ;(D = D[p]),
            Array.isArray(D) ? ((D = D.slice()), D.unshift(p)) : (D = [p, D])
        }
        return D.map(function (p) {
          return new st(p)
        })
      })
    }
    function g(h) {
      let D = f(h)
      return e(D), c(D), l(D), o(D), D
    }
    mi.exports = {
      makeTableLayout: g,
      layoutTable: e,
      addRowSpanCells: l,
      maxWidth: t,
      fillInTable: c,
      computeWidths: di('colSpan', 'desiredWidth', 'x', 1),
      computeHeights: di('rowSpan', 'desiredHeight', 'y', 1),
    }
  })()
  function di(i, e, t, r) {
    return function (n, u) {
      let s = [],
        l = [],
        o = {}
      u.forEach(function (a) {
        a.forEach(function (c) {
          ;(c[i] || 1) > 1
            ? l.push(c)
            : (s[c[t]] = Math.max(s[c[t]] || 0, c[e] || 0, r))
        })
      }),
        n.forEach(function (a, c) {
          typeof a == 'number' && (s[c] = a)
        })
      for (let a = l.length - 1; a >= 0; a--) {
        let c = l[a],
          f = c[i],
          g = c[t],
          h = s[g],
          D = typeof n[g] == 'number' ? 0 : 1
        if (typeof h == 'number')
          for (let p = 1; p < f; p++)
            (h += 1 + s[g + p]), typeof n[g + p] != 'number' && D++
        else
          (h = e === 'desiredWidth' ? c.desiredWidth - 1 : 1),
            (!o[g] || o[g] < h) && (o[g] = h)
        if (c[e] > h) {
          let p = 0
          for (; D > 0 && c[e] > h; ) {
            if (typeof n[g + p] != 'number') {
              let d = Math.round((c[e] - h) / D)
              ;(h += d), (s[g + p] += d), D--
            }
            p++
          }
        }
      }
      Object.assign(n, s, o)
      for (let a = 0; a < n.length; a++) n[a] = Math.max(r, n[a] || 0)
    }
  }
})
var Fi = F((_o, Ci) => {
  var j = ye(),
    Eu = it(),
    ot = gi(),
    Oe = class extends Array {
      constructor(e) {
        super()
        let t = Eu.mergeOptions(e)
        if (
          (Object.defineProperty(this, 'options', {
            value: t,
            enumerable: t.debug,
          }),
          t.debug)
        ) {
          switch (typeof t.debug) {
            case 'boolean':
              j.setDebugLevel(j.WARN)
              break
            case 'number':
              j.setDebugLevel(t.debug)
              break
            case 'string':
              j.setDebugLevel(parseInt(t.debug, 10))
              break
            default:
              j.setDebugLevel(j.WARN),
                j.warn(
                  `Debug option is expected to be boolean, number, or string. Received a ${typeof t.debug}`
                )
          }
          Object.defineProperty(this, 'messages', {
            get() {
              return j.debugMessages()
            },
          })
        }
      }
      toString() {
        let e = this,
          t = this.options.head && this.options.head.length
        t
          ? ((e = [this.options.head]), this.length && e.push.apply(e, this))
          : (this.options.style.head = [])
        let r = ot.makeTableLayout(e)
        r.forEach(function (u) {
          u.forEach(function (s) {
            s.mergeTableOptions(this.options, r)
          }, this)
        }, this),
          ot.computeWidths(this.options.colWidths, r),
          ot.computeHeights(this.options.rowHeights, r),
          r.forEach(function (u) {
            u.forEach(function (s) {
              s.init(this.options)
            }, this)
          }, this)
        let n = []
        for (let u = 0; u < r.length; u++) {
          let s = r[u],
            l = this.options.rowHeights[u]
          ;(u === 0 || !this.options.style.compact || (u == 1 && t)) &&
            at(s, 'top', n)
          for (let o = 0; o < l; o++) at(s, o, n)
          u + 1 == r.length && at(s, 'bottom', n)
        }
        return n.join(`
`)
      }
      get width() {
        return this.toString().split(`
`)[0].length
      }
    }
  Oe.reset = () => j.reset()
  function at(i, e, t) {
    let r = []
    i.forEach(function (u) {
      r.push(u.draw(e))
    })
    let n = r.join('')
    n.length && t.push(n)
  }
  Ci.exports = Oe
})
var lt = F((yo, Ei) => {
  Ei.exports = Fi()
})
var xu = {}
qi(xu, {
  ACCOUNT_PATH: () => _u,
  DEFAULT_AUTHORITY_ACCOUNT_KEYFILE: () => ve,
  TESTNET_VALIDATOR_KEYFILE: () => te,
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY: () => Se,
  LEDGER_PATH: () => Ge,
  LOG_PATH: () => Ze,
  MAINNET_VALIDATOR_KEYFILE: () => Qe,
  SOLV_ROOT: () => P,
  USER: () => Xe,
  VALIDATOR_STARTUP_SCRIPT: () => ie,
  VALIDATOR_VOTE_KEYFILE: () => Ee,
  VALITATOR_AUTHORITY_KEYFILE: () => be,
  VOTE_ACCOUNT_PATH: () => Au,
  WD: () => re,
  program: () => y,
})
module.exports = Pi(xu)
var ct = M(ce())
var vt = M(St(), 1),
  {
    program: Iu,
    createCommand: Mu,
    createArgument: Vu,
    createOption: Lu,
    CommanderError: Nu,
    InvalidArgumentError: ju,
    InvalidOptionArgumentError: Hu,
    Command: Bt,
    Argument: Wu,
    Option: qu,
    Help: Pu,
  } = vt.default
var Tt = '0.4.5'
var qe = require('child_process')
var Pe = async (i) => {
    let e = [`sh -c "$(curl -sSfL https://release.solana.com/v${i}/install)"`]
    ;(0, qe.spawnSync)(e.join(' && '), { shell: !0, stdio: 'inherit' })
  },
  Ue = async (i) => {
    let e = [
      `solana-validator --ledger ${Ge} exit --max-delinquent-stake ${i} --monitor`,
    ]
    ;(0, qe.spawnSync)(e.join(' && '), { shell: !0, stdio: 'inherit' })
  }
var kt =
    (i = 0) =>
    (e) =>
      `\x1B[${e + i}m`,
  $t =
    (i = 0) =>
    (e) =>
      `\x1B[${38 + i};5;${e}m`,
  Rt =
    (i = 0) =>
    (e, t, r) =>
      `\x1B[${38 + i};2;${e};${t};${r}m`,
  A = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      gray: [90, 39],
      grey: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39],
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49],
    },
  },
  Ku = Object.keys(A.modifier),
  Cn = Object.keys(A.color),
  Fn = Object.keys(A.bgColor),
  Ju = [...Cn, ...Fn]
function En() {
  let i = new Map()
  for (let [e, t] of Object.entries(A)) {
    for (let [r, n] of Object.entries(t))
      (A[r] = { open: `\x1B[${n[0]}m`, close: `\x1B[${n[1]}m` }),
        (t[r] = A[r]),
        i.set(n[0], n[1])
    Object.defineProperty(A, e, { value: t, enumerable: !1 })
  }
  return (
    Object.defineProperty(A, 'codes', { value: i, enumerable: !1 }),
    (A.color.close = '\x1B[39m'),
    (A.bgColor.close = '\x1B[49m'),
    (A.color.ansi = kt()),
    (A.color.ansi256 = $t()),
    (A.color.ansi16m = Rt()),
    (A.bgColor.ansi = kt(10)),
    (A.bgColor.ansi256 = $t(10)),
    (A.bgColor.ansi16m = Rt(10)),
    Object.defineProperties(A, {
      rgbToAnsi256: {
        value(e, t, r) {
          return e === t && t === r
            ? e < 8
              ? 16
              : e > 248
              ? 231
              : Math.round(((e - 8) / 247) * 24) + 232
            : 16 +
                36 * Math.round((e / 255) * 5) +
                6 * Math.round((t / 255) * 5) +
                Math.round((r / 255) * 5)
        },
        enumerable: !1,
      },
      hexToRgb: {
        value(e) {
          let t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16))
          if (!t) return [0, 0, 0]
          let [r] = t
          r.length === 3 && (r = [...r].map((u) => u + u).join(''))
          let n = Number.parseInt(r, 16)
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
        },
        enumerable: !1,
      },
      hexToAnsi256: {
        value: (e) => A.rgbToAnsi256(...A.hexToRgb(e)),
        enumerable: !1,
      },
      ansi256ToAnsi: {
        value(e) {
          if (e < 8) return 30 + e
          if (e < 16) return 90 + (e - 8)
          let t, r, n
          if (e >= 232) (t = ((e - 232) * 10 + 8) / 255), (r = t), (n = t)
          else {
            e -= 16
            let l = e % 36
            ;(t = Math.floor(e / 36) / 5),
              (r = Math.floor(l / 6) / 5),
              (n = (l % 6) / 5)
          }
          let u = Math.max(t, r, n) * 2
          if (u === 0) return 30
          let s =
            30 + ((Math.round(n) << 2) | (Math.round(r) << 1) | Math.round(t))
          return u === 2 && (s += 60), s
        },
        enumerable: !1,
      },
      rgbToAnsi: {
        value: (e, t, r) => A.ansi256ToAnsi(A.rgbToAnsi256(e, t, r)),
        enumerable: !1,
      },
      hexToAnsi: {
        value: (e) => A.ansi256ToAnsi(A.hexToAnsi256(e)),
        enumerable: !1,
      },
    }),
    A
  )
}
var bn = En(),
  R = bn
var me = M(require('node:process'), 1),
  Mt = M(require('node:os'), 1),
  Ye = M(require('node:tty'), 1)
function k(i, e = globalThis.Deno ? globalThis.Deno.args : me.default.argv) {
  let t = i.startsWith('-') ? '' : i.length === 1 ? '-' : '--',
    r = e.indexOf(t + i),
    n = e.indexOf('--')
  return r !== -1 && (n === -1 || r < n)
}
var { env: _ } = me.default,
  de
k('no-color') || k('no-colors') || k('color=false') || k('color=never')
  ? (de = 0)
  : (k('color') || k('colors') || k('color=true') || k('color=always')) &&
    (de = 1)
function An() {
  if ('FORCE_COLOR' in _)
    return _.FORCE_COLOR === 'true'
      ? 1
      : _.FORCE_COLOR === 'false'
      ? 0
      : _.FORCE_COLOR.length === 0
      ? 1
      : Math.min(Number.parseInt(_.FORCE_COLOR, 10), 3)
}
function _n(i) {
  return i === 0
    ? !1
    : { level: i, hasBasic: !0, has256: i >= 2, has16m: i >= 3 }
}
function yn(i, { streamIsTTY: e, sniffFlags: t = !0 } = {}) {
  let r = An()
  r !== void 0 && (de = r)
  let n = t ? de : r
  if (n === 0) return 0
  if (t) {
    if (k('color=16m') || k('color=full') || k('color=truecolor')) return 3
    if (k('color=256')) return 2
  }
  if ('TF_BUILD' in _ && 'AGENT_NAME' in _) return 1
  if (i && !e && n === void 0) return 0
  let u = n || 0
  if (_.TERM === 'dumb') return u
  if (me.default.platform === 'win32') {
    let s = Mt.default.release().split('.')
    return Number(s[0]) >= 10 && Number(s[2]) >= 10586
      ? Number(s[2]) >= 14931
        ? 3
        : 2
      : 1
  }
  if ('CI' in _)
    return 'GITHUB_ACTIONS' in _ || 'GITEA_ACTIONS' in _
      ? 3
      : [
          'TRAVIS',
          'CIRCLECI',
          'APPVEYOR',
          'GITLAB_CI',
          'BUILDKITE',
          'DRONE',
        ].some((s) => s in _) || _.CI_NAME === 'codeship'
      ? 1
      : u
  if ('TEAMCITY_VERSION' in _)
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(_.TEAMCITY_VERSION) ? 1 : 0
  if (_.COLORTERM === 'truecolor' || _.TERM === 'xterm-kitty') return 3
  if ('TERM_PROGRAM' in _) {
    let s = Number.parseInt((_.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
    switch (_.TERM_PROGRAM) {
      case 'iTerm.app':
        return s >= 3 ? 3 : 2
      case 'Apple_Terminal':
        return 2
    }
  }
  return /-256(color)?$/i.test(_.TERM)
    ? 2
    : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
        _.TERM
      ) || 'COLORTERM' in _
    ? 1
    : u
}
function It(i, e = {}) {
  let t = yn(i, { streamIsTTY: i && i.isTTY, ...e })
  return _n(t)
}
var xn = {
    stdout: It({ isTTY: Ye.default.isatty(1) }),
    stderr: It({ isTTY: Ye.default.isatty(2) }),
  },
  Vt = xn
function Lt(i, e, t) {
  let r = i.indexOf(e)
  if (r === -1) return i
  let n = e.length,
    u = 0,
    s = ''
  do (s += i.slice(u, r) + e + t), (u = r + n), (r = i.indexOf(e, u))
  while (r !== -1)
  return (s += i.slice(u)), s
}
function Nt(i, e, t, r) {
  let n = 0,
    u = ''
  do {
    let s = i[r - 1] === '\r'
    ;(u +=
      i.slice(n, s ? r - 1 : r) +
      e +
      (s
        ? `\r
`
        : `
`) +
      t),
      (n = r + 1),
      (r = i.indexOf(
        `
`,
        n
      ))
  } while (r !== -1)
  return (u += i.slice(n)), u
}
var { stdout: jt, stderr: Ht } = Vt,
  ze = Symbol('GENERATOR'),
  U = Symbol('STYLER'),
  X = Symbol('IS_EMPTY'),
  Wt = ['ansi', 'ansi', 'ansi256', 'ansi16m'],
  G = Object.create(null),
  wn = (i, e = {}) => {
    if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
      throw new Error('The `level` option should be an integer from 0 to 3')
    let t = jt ? jt.level : 0
    i.level = e.level === void 0 ? t : e.level
  }
var On = (i) => {
  let e = (...t) => t.join(' ')
  return wn(e, i), Object.setPrototypeOf(e, ee.prototype), e
}
function ee(i) {
  return On(i)
}
Object.setPrototypeOf(ee.prototype, Function.prototype)
for (let [i, e] of Object.entries(R))
  G[i] = {
    get() {
      let t = ge(this, Je(e.open, e.close, this[U]), this[X])
      return Object.defineProperty(this, i, { value: t }), t
    },
  }
G.visible = {
  get() {
    let i = ge(this, this[U], !0)
    return Object.defineProperty(this, 'visible', { value: i }), i
  },
}
var Ke = (i, e, t, ...r) =>
    i === 'rgb'
      ? e === 'ansi16m'
        ? R[t].ansi16m(...r)
        : e === 'ansi256'
        ? R[t].ansi256(R.rgbToAnsi256(...r))
        : R[t].ansi(R.rgbToAnsi(...r))
      : i === 'hex'
      ? Ke('rgb', e, t, ...R.hexToRgb(...r))
      : R[t][i](...r),
  Sn = ['rgb', 'hex', 'ansi256']
for (let i of Sn) {
  G[i] = {
    get() {
      let { level: t } = this
      return function (...r) {
        let n = Je(Ke(i, Wt[t], 'color', ...r), R.color.close, this[U])
        return ge(this, n, this[X])
      }
    },
  }
  let e = 'bg' + i[0].toUpperCase() + i.slice(1)
  G[e] = {
    get() {
      let { level: t } = this
      return function (...r) {
        let n = Je(Ke(i, Wt[t], 'bgColor', ...r), R.bgColor.close, this[U])
        return ge(this, n, this[X])
      }
    },
  }
}
var vn = Object.defineProperties(() => {}, {
    ...G,
    level: {
      enumerable: !0,
      get() {
        return this[ze].level
      },
      set(i) {
        this[ze].level = i
      },
    },
  }),
  Je = (i, e, t) => {
    let r, n
    return (
      t === void 0
        ? ((r = i), (n = e))
        : ((r = t.openAll + i), (n = e + t.closeAll)),
      { open: i, close: e, openAll: r, closeAll: n, parent: t }
    )
  },
  ge = (i, e, t) => {
    let r = (...n) => Bn(r, n.length === 1 ? '' + n[0] : n.join(' '))
    return Object.setPrototypeOf(r, vn), (r[ze] = i), (r[U] = e), (r[X] = t), r
  },
  Bn = (i, e) => {
    if (i.level <= 0 || !e) return i[X] ? '' : e
    let t = i[U]
    if (t === void 0) return e
    let { openAll: r, closeAll: n } = t
    if (e.includes('\x1B'))
      for (; t !== void 0; ) (e = Lt(e, t.close, t.open)), (t = t.parent)
    let u = e.indexOf(`
`)
    return u !== -1 && (e = Nt(e, n, r, u)), r + e + n
  }
Object.defineProperties(ee.prototype, G)
var Tn = ee(),
  is = ee({ level: Ht ? Ht.level : 0 })
var x = Tn
var Kt = M(zt()),
  N
;((t) => (
  (t.normal = (r) => {
    console.log(x.white(r))
  }),
  (t.syncSpinner = (r) => {
    let n = new Kt.Spinner(
      x.white(r) +
        ` %s
`
    )
    try {
      return n.setSpinnerString(18), n.start(), n
    } catch (u) {
      throw (n.stop(!0), new Error(`syncSpinner Error: ${u}`))
    }
  })
))((N ||= {}))
var Jt = async () => {
  let i = y.command('update').description('Update Solana Validator Node')
  i
    .command('solana')
    .alias('s')
    .description('Update Solana Version')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .action(async (e) => {
      let t = N.syncSpinner(`\u2714\uFE0F Updating Solana to ${x.green(e)}`)
      await Pe(e), t.stop(!0)
    }),
    i
      .command('monitor')
      .alias('m')
      .description('Monitor Update')
      .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
      .action(async (e) => {
        let t = N.syncSpinner(
          `\u2714\uFE0F Monitoring Update with Max Delinquent Stake ${x.green(
            e
          )}`
        )
        await Ue(e), t.stop(!0)
      }),
    i
      .command('all')
      .alias('a')
      .description('Update Solana Version and Monitor Update')
      .argument('<version>', 'Solana Version e.g. 1.16.7')
      .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
      .action(async (e, t) => {
        let r = N.syncSpinner(
          `\u2714\uFE0F Updating Solana to ${x.green(
            e
          )} and Monitoring Update with Max Delinquent Stake ${x.green(t)}`
        )
        await Pe(e), await Ue(t), r.stop(!0)
      })
}
var Zt = require('child_process'),
  Qt = (i) => {
    try {
      let e = `tail -f ${Ze}/solana-validator.log`
      i.error
        ? (e += " | grep '\\(WARN\\|ERR\\)'")
        : i.info
        ? (e += ' | grep INFO')
        : i.warning && (e += ' | grep WARN'),
        console.log(e),
        (0, Zt.spawn)(e, { shell: !0, stdio: 'inherit' }).on('error', (r) => {
          throw new Error(`tail Error: ${r}`)
        })
    } catch (e) {
      throw new Error(`tail Error: ${e}`)
    }
  }
var Xt = async () => {
  y.command('log')
    .description('log commands')
    .command('tail')
    .alias('t')
    .description('tail logs')
    .option('-i, --info', 'Follow INFO output', !1)
    .option('-w, --warning', 'Follow WARN output', !1)
    .option('-e, --error', 'Follow ERR output', !1)
    .option('-a, --all', 'Follow WARN and ERR output', !1)
    .action((e) => {
      Qt(e)
    })
}
var er = require('child_process'),
  Ce = require('fs'),
  Fe = (i) => {
    let e = `release/solv_${i}`
    ;(0, Ce.existsSync)(e) || (0, Ce.mkdirSync)(e)
    let t = `mv solv_${i}* ${e}`
    ;(0, er.spawn)(t, { shell: !0, stdio: 'inherit' })
  }
var H = require('child_process'),
  tr = M(ce())
tr.config()
var Mn = process.env.GPG_SECRET || '',
  rr = async (i) => {
    ;(0, H.spawnSync)(['debuild', '-us', '-uc'].join(' '), {
      shell: !0,
      stdio: 'inherit',
      cwd: 'solv-debian/debian',
    }),
      (0, H.spawnSync)(['debuild', '-S', '-sa'].join(' '), {
        shell: !0,
        stdio: 'inherit',
        cwd: 'solv-debian/debian',
      })
    let r = ['debsign', `-k${Mn}`, `solv_${i}_*.changes`]
    ;(0, H.spawnSync)(r.join(' '), { shell: !0, stdio: 'inherit' })
    let n = ['dput', 'ppa:epics-dao/solv', `solv_${i}_source.changes`]
    ;(0, H.spawnSync)(n.join(' '), { shell: !0, stdio: 'inherit' }),
      Fe(i),
      (0, H.spawnSync)(['yarn', 'build'].join(' '), {
        shell: !0,
        stdio: 'inherit',
      })
    let s = [
      'git add .',
      `git commit -m "Release ${i}"`,
      'git push origin main',
    ]
    for (let o of s) (0, H.spawnSync)(o, { shell: !0, stdio: 'inherit' })
    let l = ['npm publish']
    for (let o of l) (0, H.spawnSync)(o, { shell: !0, stdio: 'inherit' })
    N.normal(`Release ${i} complete!`)
  }
var ir = async () => {
  y.command('release')
    .description('release commands')
    .alias('r')
    .description('publish release')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .option('-m, --mv', 'Only Move deb files to release folder', !1)
    .action(async (i, e) => {
      e.mv ? Fe(i) : await rr(i)
    })
}
var fr = require('child_process')
var nr = require('child_process'),
  ur = require('fs'),
  sr = () => {
    try {
      ;[
        '/mt/solana/solana-validator/log',
        '/mt/solana/solana-accounts',
        '/mt/ledger/validator-ledger',
      ].forEach((e) => {
        if ((0, ur.existsSync)(e)) return
        let t = `mkdir -p ${e}`
        ;(0, nr.spawnSync)(t, { shell: !0, stdio: 'inherit' })
      })
    } catch (i) {
      throw new Error(`setupDirs Error: ${i}`)
    }
  }
var or = require('child_process'),
  ar = () => {
    ;(0, or.spawnSync)('sudo chown -R solv:solv /mt/*', {
      shell: !0,
      stdio: 'inherit',
    })
  }
var lr = require('child_process'),
  Dr = M(ce())
Dr.config()
var Vn = process.env.SOL_NETWORK || 'testnet',
  cr = async () => {
    try {
      return (
        [
          `solana-keygen new --no-bip39-passphrase --outfile ${be}`,
          `solana-keygen new --no-bip39-passphrase --outfile ${Ee}`,
          `solana-keygen new --no-bip39-passphrase --outfile ${te}`,
          `solana-keygen new --no-bip39-passphrase --outfile ${Qe}`,
          `solana config set --keypair ${te}`,
          `solana config set --url ${Vn}`,
          `solana create-vote-account ${Ee} ${te} ${be} --commission 10`,
        ].forEach((e) => {
          ;(0, lr.spawnSync)(e, { shell: !0, stdio: 'inherit' })
        }),
        !0
      )
    } catch (i) {
      throw new Error(`setupKeys Error: ${i}`)
    }
  }
var hr = require('child_process'),
  pr = () => {
    try {
      let i = [
        'sudo mount -t tmpfs -o rw,size=300G tmpfs /mt/solana-accounts',
        'sudo dd if=/dev/zero of=/swapfile bs=1G count=300',
        'sudo mkswap /mt/swapfile',
        'sudo chmod 600 /mt/swapfile',
        'sudo swapon /mt/swapfile',
      ]
      console.log(
        x.white(`Setting up swap...
`)
      )
      let e = N.syncSpinner('This may take a while...')
      ;(0, hr.spawnSync)(i.join(' && '), { shell: !0, stdio: 'inherit' }),
        e.stop(),
        console.log(
          x.green(`Swap setup complete!
`)
        )
    } catch (i) {
      throw new Error(`setupSwap Error: ${i}`)
    }
  }
var dr = (i = { swap: !1 }) => {
  try {
    return (
      sr(),
      ar(),
      cr(),
      i.swap && pr(),
      (0, fr.spawnSync)(
        [
          'sudo systemctl daemon-reload',
          'sudo systemctl enable solana',
          'sudo systemctl start solana',
          'sudo systemctl restart logrotate',
        ].join(' && '),
        { shell: !0, stdio: 'inherit' }
      ),
      !0
    )
  } catch (e) {
    throw new Error(`setup Error: ${e}`)
  }
}
var mr = (i) => {
  let e = re
  return `[Unit]
Description=Solana Validator
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
LimitNOFILE=1000000
LogRateLimitIntervalSec=0
User=${i}
Environment=PATH=/home/${i}/.local/share/solana/install/active_release/bin
WorkingDirectory=${e}
Environment="SOLANA_METRICS_CONFIG=host=https://metrics.solana.com:8086,db=tds,u=testnet_write,p=c4fa841aa918bf8274e3e2a44d77568d9861b3ea"
ExecStart=${e}/start-validator.sh

[Install]
WantedBy=multi-user.target`
}
var gr = require('fs'),
  Cr = () => {
    try {
      let i = mr(Xe)
      ;(0, gr.writeFileSync)(`${ie}`, i, 'utf-8')
    } catch (i) {
      throw new Error(`startValidator Error: ${i}`)
    }
  }
var Fr = async () => {
  y.command('setup')
    .description('Solana Setup Command')
    .option('--sh', 'Update Validator StartUp Bash Script', !1)
    .option('--swap', 'Setup Swap', !1)
    .action((i) => {
      console.log('setup'),
        console.log({ options: i }),
        i.sh
          ? (console.log(x.white(`Generating ${ie} ...`)), Cr())
          : (console.log(x.white('Setting up Solana Validator ...')), dr(i))
    })
}
var Er = require('child_process'),
  _e = () =>
    (0, Er.execSync)('df -h')
      .toString()
      .split(
        `
`
      )
      .slice(1)
      .filter((r) => r.split(/\s+/)[0] !== '')
      .map((r) => {
        let n = r.split(/\s+/)
        return {
          Filesystem: n[0],
          Size: n[1],
          Used: n[2],
          Avail: n[3],
          Use: n[4],
          MountedOn: n[5],
        }
      })
      .sort((r, n) => Ae(n.Avail) - Ae(r.Avail))
      .sort((r, n) => Ae(n.Avail) - Ae(r.Avail)),
  Ae = (i) => {
    let e = { K: 1e3, M: 1e6, G: 1e9, T: 1e12 },
      t = i.slice(-1),
      r = parseFloat(i.slice(0, -1))
    return e[t] ? r * e[t] : r
  }
var Dt = require('child_process'),
  bi = M(lt()),
  bu = (i = '/mt/*') => {
    let e = i.replace(/[^a-zA-Z0-9_\-\/. ]/g, ''),
      t = (0, Dt.execSync)(`du -sb ${e}`).toString()
    return parseInt(t.split('	')[0], 10)
  },
  Ai = (i = '/mt/*') => {
    let e = i.replace(/[^a-zA-Z0-9_\-\/. ]/g, ''),
      t = bu(e),
      r = (0, Dt.execSync)(`df ${e}`).toString().split(`
`)
    if (r.length < 2) {
      console.error('Failed to retrieve disk usage details')
      return
    }
    let n = r[1].split(/\s+/),
      u = parseInt(n[1], 10) * 1024,
      s = new bi.default({
        head: ['Parameter', 'Size (in bytes)'],
        colWidths: [20, 20],
      })
    s.push(['Total', u], ['Used', t], ['Available', u - t]),
      console.log(s.toString())
  }
var _i = async () => {
  y
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      let i = _e()
      console.log(i)
    }),
    y
      .command('df:check')
      .description('Solana Disk Free Check Command')
      .action(async () => {
        Ai()
      })
}
var yi = require('child_process'),
  xi = () => {
    ;(0, yi.spawnSync)(['sudo systemctl stop sol'][0], {
      shell: !0,
      stdio: 'inherit',
    })
  }
var wi = () => {
  y.command('stop')
    .description('Stop Solana')
    .action(async () => {
      xi()
    })
}
var Oi = require('child_process'),
  Si = async (
    i,
    e,
    t = '/mt/solana/solana-validator/authority-keypair.json'
  ) => {
    try {
      let r = [`solana delegate-stake ${i} ${e} --stake-authority ${t}`]
      return (
        (0, Oi.spawnSync)(r.join(' && '), { shell: !0, stdio: 'inherit' }), !0
      )
    } catch (r) {
      throw new Error(`delegateStake Error: ${r}`)
    }
  }
var vi = async () => {
  y.command('stake')
    .description('Solana Delegate Stake Command')
    .argument('<stakeAccountPubkey>', 'Stake Account Pubkey')
    .option(
      '-v, --validator <validatorVoteAccountPubkey>',
      `Validator Vote Account Pubkey e.g. ${Se}`
    )
    .option(
      '-a, --authority <authorityAccountKeyfile>',
      `Authority Account Keyfile e.g. ${ve}`
    )
    .action(async (i, e) => {
      let t = e.validator || Se,
        r = e.authority || ve
      await Si(i, t, r)
    })
}
var Bi = M(lt()),
  Ti = (i) => {
    let e = ['Filesystem', 'Size', 'Used', 'Avail', 'Use', 'MountedOn'].map(
        (r) => x.blue(r)
      ),
      t = new Bi.default({ head: e, colWidths: [20, 10, 10, 10, 10, 20] })
    i.forEach((r) => {
      t.push(
        [r.Filesystem, r.Size, r.Used, r.Avail, r.Use, r.MountedOn].map((n) =>
          x.white(n)
        )
      )
    }),
      console.log(t.toString())
  }
var ki = require('fs'),
  $i = () =>
    (0, ki.readFileSync)('/etc/fstab', 'utf-8')
      .split(
        `
`
      )
      .filter((n) => n[0] !== '#')
      .map((n) => {
        let u = n.split(/\s+/)
        return {
          FileSystem: u[0],
          MountPoint: u[1],
          Type: u[2],
          Options: u[3],
          Dump: u[4],
          Pass: u[5],
        }
      })
var Ri = () => {
  y
    .command('check')
    .description('Solana Check Command')
    .action(() => {
      console.log('checking ...')
      let i = _e()
      Ti(i)
    }),
    y
      .command('fstab')
      .description('Check Fstab Command')
      .action(() => {
        let i = $i()
        console.log(i)
      })
}
ct.default.config()
var Xe = process.env.SOLV_USER || 'solv',
  P = '/mt/solana',
  re = `${P}/solana-validator`,
  Ze = `${re}/log`,
  Au = `${P}/vote-account.json`,
  _u = '/mt/solana-accounts',
  Ge = '/mt/ledger/validator-ledger',
  ie = `${re}/start-validator.sh`,
  Qe = `${P}/mainnet-validator-keypair.json`,
  te = `${P}/testnet-validator-keypair.json`,
  Ee = `${P}/vote-account-keypair.json`,
  be = `${P}/authority-keypair.json`,
  Se = '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1',
  ve = './authority-keypair.json',
  y = new Bt()
y.name('solv').description('CLI for Solana Validators').version(Tt)
ct.default.config()
async function yu() {
  try {
    y
      .command('solv')
      .description('CLI for Solana Validators')
      .action(() => {
        console.log('solv')
      }),
      wi(),
      Ri(),
      await Fr(),
      await _i(),
      await vi(),
      await Jt(),
      await Xt(),
      await ir(),
      await y.parseAsync(process.argv)
  } catch (i) {
    console.log(i)
  }
}
yu()
0 &&
  (module.exports = {
    ACCOUNT_PATH,
    DEFAULT_AUTHORITY_ACCOUNT_KEYFILE,
    TESTNET_VALIDATOR_KEYFILE,
    DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY,
    LEDGER_PATH,
    LOG_PATH,
    MAINNET_VALIDATOR_KEYFILE,
    SOLV_ROOT,
    USER,
    VALIDATOR_STARTUP_SCRIPT,
    VALIDATOR_VOTE_KEYFILE,
    VALITATOR_AUTHORITY_KEYFILE,
    VOTE_ACCOUNT_PATH,
    WD,
    program,
  })
