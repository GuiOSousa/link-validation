# Link-validation (v1.0.5)

Returns all the links found in a file or directory (recursively checks each file).


## USAGE
You can use the command "link-validation" on your terminal, followed by the path you want to check. This should print all links found on the directory/file. Flags are optional.

Remember: Directory paths should end with "/".


## EXAMPLE
``link-validation <path> --validate``

should return:

    fileName:
    [
        {
            link: 'https://github.com/GuiOSousa/link-validation',
            status: 200
        },
        {
            link: 'anotherlink.com'
            status: 200
        }
    ]


## FLAGS
- --validate: Brings also the status of the current URL. (200 is OK, 404 is NotFound).


## CURRENT NEW FEATURES
- Support for common URL notation (v1.0.4 could only found links in .md files).

## FUTURE FEATURES
- An object or function that could check the links in the code, not only on the command prompt.
- A cleaner way to print the link list.
- Unify the validated print and the non-validated print.