import { usePathname, useSearchParams } from "expo-router";
import newrelic from 'newrelic-react-native-agent';
import { useEffect } from "react";
// import Logger from './Logger';
import { NEW_RELIC_LICENSE_KEY } from "@env"
import { version } from '../package.json'

export default () => {
  const pathname = usePathname();
  const params = useSearchParams();

  newrelic.startAgent(NEW_RELIC_LICENSE_KEY);
  newrelic.setJSAppVersion(version);

  useEffect(() => {
    newrelic.recordBreadcrumb('navigation', { pathname, params });
    console.log('navigation', { pathname, params });
  }, [pathname, params]);
  return null;
}