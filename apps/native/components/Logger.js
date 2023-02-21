import { logger } from "react-native-logs";
import newrelic from 'newrelic-react-native-agent';
import { name } from '../package.json'
import { NEW_RELIC_API_KEY, NEW_RELIC_LOGS_URL} from "@env"

// https://docs.newrelic.com/docs/logs/log-api/introduction-log-api/
const Logger = logger.createLogger({
    transport: (props) => {
        props.entity = { name }
        props.service = name
        
        newrelic.send('log', props)

        console.log('Sending logs to new relic', props)

        fetch(NEW_RELIC_LOGS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': NEW_RELIC_API_KEY,
            },
            body: JSON.stringify(props)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logs successfully sent to new relic', data);
        })
        .catch(error => {
            console.error(error);
            newrelic.recordError(error);
        });
    },
});

export default Logger
  
  