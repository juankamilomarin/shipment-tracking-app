import i18nProvider from './i18nProvider'
import en from './i18n/en'

jest.mock('ra-i18n-polyglot', () => fn => fn('en'))
jest.mock('ra-language-english', () => ({
    englishMessages: { test: { englishMessage: 'Test english message' } }
}))

describe("i18nProvider", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return all English translations", () => {
        const expectedTranslations = {
            englishMessages: { test: { englishMessage: 'Test english message' } },
            ...en
        }
        expect(i18nProvider).toStrictEqual(expectedTranslations)
    });

});