module.exports = {
    'hooks': {
        'pre-commit': 'yarn format && yarn lint-staged',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
        'pre-push': 'yarn type-check',
    }
}