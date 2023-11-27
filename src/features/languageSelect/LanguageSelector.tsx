import {Box, Button, Menu, MenuButton, MenuItem, MenuList, Show, Text} from "@chakra-ui/react";
import {IoChevronDownSharp, IoChevronUpSharp} from "react-icons/io5";
import {useTranslation} from "react-i18next";
import {FlagComponent, SE, US} from "country-flag-icons/react/3x2";

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
    Icon: US,
    label: "English"
  }]

export const LanguageSelector = () => {
  const {i18n} = useTranslation()
  const selectedLanguage = languageOptions.find(language => language.languageKey === i18n.language)
  if (!selectedLanguage) {
    console.error("Could not find language:", i18n.language)
    return null
  }
  const availableLanguages = languageOptions.filter(language => language !== selectedLanguage)

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return <Box sx={{
    position: "absolute",
    right: "5px",
    top: "5px"
  }}>
    <Menu gutter={0}>
      {({isOpen}) => <>
        <MenuButton
          _hover={{}}
          _active={{}}
          as={Button}
          rightIcon={isOpen ? <IoChevronUpSharp/> : <IoChevronDownSharp/>}
          leftIcon={<selectedLanguage.Icon width={32}/>}
        >
          <Show above={"sm"}><Text>{selectedLanguage.label}</Text></Show>
        </MenuButton>
        <MenuList sx={{minWidth: "none"}}>
          {availableLanguages.map(languageMeta =>
            <MenuItem
              _focus={{bg: "none"}}
              sx={{paddingTop: 0, paddingBottom: 0}}
              onClick={() => setLanguage(languageMeta.languageKey)}
              icon={<languageMeta.Icon width={32}/>}
            >
              <Show above={"sm"}><Text>{languageMeta.label}</Text></Show>
            </MenuItem>)
          }
        </MenuList>
      </>}
    </Menu>
  </Box>
}

