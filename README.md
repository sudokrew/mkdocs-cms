# MkDocs-CMS

Is a simple cms solution for MkDocs wrapped in node.

* Markdown version (master)
* Html version (html)

## Getting Started
Since this is a wrapper for [MkDocs](http://www.mkdocs.org/) you will need to have it set up and installed on your system. In order to install MkDocs you'll need [Python](http://python.org) installed, as well as the Python package manager, [pip](http://pip.readthedocs.org/en/latest/installing.html). You can check if you have these already installed ike so:

```bash
  $ python --version
  Python 2.7.2

  $ pip --version
  pip 1.5.2
```
MkDocs supports Python 2.6, 2.7, 3.3 and 3.4.

MkDocs recoomends for Windows users to install Python and pip with [Chocolatey](https://chocolatey.org/)

After you have Python & pip, you can use it to install the `mkdocs` package:
```bash
  $ pip install mkdocs
```

If installed you should now have the `mkdocs` commands available.
```bash
  $ mkdocs help
  mkdocs [help|new|build|serve|gh-deploy] {options}
```

## Project Set Up

  * Node (v 0.12.7)

  ```bash
    $ npm install
  ```

  ```bash
    $ bower install
  ```

### Run development processes

  * Task runner with gulp.js

  ```bash
    $ gulp
  ```

  * If gulp is running, "rs" in the terminal will restart the servers

  ```bash
    $ rs
  ```

## Further Reading
  * [MKDocs](http://www.mkdocs.org/user-guide/configuration/) is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Documentation source files are written in Markdown, and configured with a single YAML configuration file.

  * [SimpleMDE](http://nextstepwebs.github.io/simplemde-markdown-editor/) is a simple, embeddable, and beautiful markdown editor.
