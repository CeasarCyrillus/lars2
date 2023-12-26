import {Box, Tab, TabList, Tabs} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {FlagComponent, GB, SE} from "country-flag-icons/react/3x2";

type LanguageMeta = {
  Icon: FlagComponent,
  label: string,
  languageKey: string
}

const languageOptions: LanguageMeta[] = [
  {
    languageKey: "sv",
    Icon: SE,
    label: "Svenska"
  },
  {
    languageKey: "en",
    Icon: GB,
    label: "English"
  }]

export const LanguageButtons = () => {
  const {i18n} = useTranslation()
  const selectedLanguage = languageOptions.find(language => language.languageKey === i18n.language)
  if (!selectedLanguage) {
    console.error("Could not find language:", i18n.language)
    return null
  }

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return <Box sx={{
    position: "absolute",
    right: "5px",
    top: "5px"
  }}>
    <Tabs
      variant={"solid-rounded"}
      colorScheme={"orange"}
      onChange={(tabIndex) => setLanguage(languageOptions[tabIndex].languageKey)}
      defaultIndex={languageOptions.findIndex(l => l.languageKey === selectedLanguage.languageKey)}
    >
      <TabList>
        {languageOptions.map((l) =>
          <Tab key={l.languageKey} value={0}>
            <l.Icon width={32}/>
          </Tab>
        )}
      </TabList>
    </Tabs>
  </Box>
}

