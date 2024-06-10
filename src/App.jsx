import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";
import { IntlProvider } from "react-intl";
import flattenMessages from "./utils/flattenMessages";
import en from "../src/translations/en.json";
import vi from "../src/translations/vi.json";

const messages = {
  en: flattenMessages(en),
  vi: flattenMessages(vi),
};

function App() {
  const [language, setLanguage] = useState("");

  const dispatch = useDispatch();
  const { token, locale } = useSelector((state) => state.auth);

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes)

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Router allRoutes={allRoutes} />
    </IntlProvider>
  );
}

export default App;
