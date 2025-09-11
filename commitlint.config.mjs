import { defineConfig } from 'cz-git';

const types = [
	'init',
	'feat',
	'update',
	'validate',
	'database',
	'update-log',
	'fix',
	'simple-fix',
	'hotfix',
	'docs',
	'style',
	'refactor',
	'in-progress',
	'remove',
	'perf',
	'seo',
	'test',
	'ignore',
	'build',
	'update-deps',
	'ci',
	'configs',
	'chore',
	'breaking',
	'revert',
	'deploy',
	'bookmark',
	'lock',
	'closed-lock',
];

export default defineConfig({
	extends: ['gitmoji'],
	prompt: {
		alias: {
			':': 'docs: update README',
			b: 'chore: bump dependencies',
			c: 'chore: update config files',
			f: 'docs: fix typos',
		},
		emojiAlign: 'left',
		themeColorCode: '38;5;046',
		types: [
			{
				emoji: ':tada:',
				name: 'init:            🎉  Begin a project.',
				value: 'init',
			},
			{
				emoji: ':sparkles:',
				name: 'feat:            ✨  A new feature',
				value: 'feat',
			},
			{
				emoji: ':necktie:',
				name: 'update:          👔  Add or update business logic.',
				value: 'update',
			},
			{
				emoji: ':safety_vest:',
				name: 'validate:        🦺  Add or update code related to validation.',
				value: 'validate',
			},
			{
				emoji: ':card_file_box:',
				name: 'database:        🗃️   Perform database related changes.',
				value: 'database',
			},
			{
				emoji: ':loud_sound:',
				name: 'update-log:      🔊  Add or update logs.',
				value: 'update-log',
			},
			{
				emoji: ':bug:',
				name: 'fix:             🐛  A bug fix',
				value: 'fix',
			},
			{
				emoji: ':adhesive_bandage:',
				name: 'simple-fix:      🩹  Simple fix for a non-critical issue.',
				value: 'simple-fix',
			},
			{
				emoji: ':bug:',
				name: 'hotfix:          🚑️  Critical hotfix.',
				value: 'hotfix',
			},
			{
				emoji: ':memo:',
				name: 'docs:            📝  Documentation only changes',
				value: 'docs',
			},
			{
				emoji: ':lipstick:',
				name: 'style:           💄  Changes that do not affect the meaning of the code',
				value: 'style',
			},
			{
				emoji: ':recycle:',
				name: 'refactor:        ♻️   A code change that neither fixes a bug nor adds a feature',
				value: 'refactor',
			},
			{
				emoji: ':construction:',
				name: 'in-progress:     🚧  Work in progress.',
				value: 'in-progress',
			},
			{
				emoji: ':fire:',
				name: 'remove:          🔥  Remove code or files.',
				value: 'remove',
			},
			{
				emoji: ':mag:',
				name: 'perf:            ⚡️  A code change that improves performance',
				value: 'perf',
			},
			{
				emoji: ':zap:',
				name: 'seo:             🔍️  Improve SEO.',
				value: 'seo',
			},
			{
				emoji: ':white_check_mark:',
				name: 'test:            ✅  Adding missing tests or correcting existing tests',
				value: 'test',
			},
			{
				emoji: ':see_no_evil:',
				name: 'ignore:          🙈  Add or update a .gitignore file.',
				value: 'ignore',
			},
			{
				emoji: ':package:',
				name: 'build:           📦️  Changes that affect the build system or external dependencies',
				value: 'build',
			},
			{
				emoji: ':arrow_up:',
				name: 'update-deps:     ⬆️   Upgrade dependencies.',
				value: 'update-deps',
			},
			{
				emoji: ':ferris_wheel:',
				name: 'ci:              🎡  Changes to our CI configuration files and scripts',
				value: 'ci',
			},
			{
				emoji: ':wrench:',
				name: 'configs:         🔧  Add or update configuration files.',
				value: 'configs',
			},
			{
				emoji: ':hammer:',
				name: "chore:           🔨  Other changes that don't modify src or test files",
				value: 'chore',
			},
			{
				emoji: ':boom:',
				name: 'breaking-change: 💥  Introduce breaking changes.',
				value: 'breaking',
			},
			{
				emoji: ':rewind:',
				name: 'revert:          ⏪️  Reverts a previous commit',
				value: 'revert',
			},
			{
				emoji: ':rocket:',
				name: 'deploy:          🚀  Deploy stuff.',
				value: 'deploy',
			},
			{
				emoji: ':bookmark:',
				name: 'bookmark:        🔖  Release / Version tags.',
				value: 'bookmark',
			},
			{
				emoji: ':lock:',
				name: 'lock:            🔒️  Fix security or privacy issues.',
				value: 'lock',
			},
			{
				emoji: ':closed_lock_with_key:',
				name: 'closed-lock:     🔐  Fix security or privacy issues.',
				value: 'closed-lock',
			},
		],
		useEmoji: true,
	},
	rules: {
		'header-case': [2, 'always', 'lower-case'],
		'subject-empty': [2, 'never'],
		'subject-min-length': [2, 'always', 2],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [2, 'always', types],
	},
});
