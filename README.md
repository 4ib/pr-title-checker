# Pull Request Title Checker

This action checks if PR titles conform to the specified regex.

## Create Workflow

Create a workflow (eg: `.github/workflows/pr-title-cheker.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) 
to utilize the pr-title-checker action with content:

```
name: "PR Title Checker"
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: 4ib/pr-title-checker@v1.1.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          regex: "\\[(Feature|Fix|Hotfix|Refactor)\\] [-\\w]+: .+"
          label_name: bad-title
          label_color: ffDD00
```

## Thanks

This action based on https://github.com/thehanimo/pr-title-checker

## License

[MIT](https://github.com/4ib/pr-title-checker/blob/master/LICENSE)
