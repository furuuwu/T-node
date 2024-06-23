# npm cli

This refers to npm cli ^10.0.0

which means, version 10.0.0 or later but less than version 11.0.0

https://docs.npmjs.com/cli/v10

## npm

`npm --version`

## npm-docs

Open documentation for a package in a web browser

`npm docs [<pkgname> [<pkgname> ...]]`

## npm-init

Create a package.json file

`npm init <package-spec>` (same as `npx <package-spec>`)

If the initializer is omitted (by just calling npm init), init will fall back to legacy init behavior. It will ask you a bunch of questions, and then write a package.json for you. It will attempt to make reasonable guesses based on existing fields, dependencies, and options selected. It is strictly additive, so it will keep any fields and values that were already set. You can also use -y/--yes to skip the questionnaire altogether.

`npm init`

`npm init -y`

## npm-install

Install a package

`npm install [<package-spec> ...]`

aliases: add, i

***

`npm install` (in a package directory, no arguments):

OR `npm i`

Install the dependencies to the local node_modules folder.

***

`npm install <package>@<version>`

to install a specific version `<version>` of `<package>` 

The version uses a specific syntax (semantic versioning):

MAJOR.MINOR.PATCH

eg. if you want to install express v1.2.3

`npm i express@1.2.3`

to install the latest stable version

`npm i express@latest`

to install the most recent release (generally not a good idea or needed unless you are helping with open source projects)

`npm i express@next`

to install the latest version of a.x.x (> a.0.0 and < a+1.0.0)
= caret dependency

`npm i express@^4.0.0` # requires version 4.0.0 or later but less than version 5.0.0

OR

`npm i express@^4.x`

This is generally the best option because it chooses versions without vulnerabilities and there are no compatibility issues

to install the latest version of a.b.x (>a.b.0 and < a.b+1.0 )

`npm i express@~4.1.0`

OR

`npm i express@~4.1.x`

## npm-uninstall

Remove a package

`npm uninstall [<@scope>/]<pkg>...`

aliases: unlink, remove, rm

This uninstalls a package, completely removing everything npm installed on its behalf.

It also removes the package from the dependencies, devDependencies, optionalDependencies, and peerDependencies objects in your package.json.

## npm-ls

List installed packages

`npm ls <package-spec>`

This command will print to stdout all the versions of packages that are installed, as well as their dependencies when --all is specified, in a tree structure.

`npm ls`

`npm ls --all` # shows sub-dependencies

## npm-update

Update packages

`npm update [<pkg>...]`

aliases: up, upgrade, udpate

This command will update all the packages listed to the latest version (specified by the tag config), respecting the semver constraints of both your package and its dependencies (if they also require the same package).

It will also install missing packages.


## npm-outdated

`npm outdated [<package-spec> ...]`

This command will check the registry to see if any (or, specific) installed packages are currently outdated.

By default, only the direct dependencies of the root project and direct dependencies of your configured workspaces are shown. Use --all to find all outdated meta-dependencies as well.

## npm-run-script

`npm run-script <command> [-- <args>]`

aliases: run

This runs an arbitrary command from a package's "scripts" object. If no "command" is provided, it will list the available scripts.

`npm run`

In addition to the shell's pre-existing PATH, npm run adds node_modules/.bin to the PATH provided to scripts. Any binaries provided by locally-installed dependencies can be used without the node_modules/.bin prefix.


## npm-start

`npm start [-- <args>]`

This runs a predefined command specified in the "start" property of a package's "scripts" object.

If the "scripts" object does not define a "start" property, npm will run node server.js

eg.
{
  "scripts": {
    "start": "node foo.js"
  }
}

`npm start`

## npm-version

Bump a package version

`npm version`

`npm version patch -m "Upgrade to %s for reasons"`