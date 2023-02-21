import React, { useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import newrelic from 'newrelic-react-native-agent'
import Logger from '../components/Logger';
import { API_URL } from "@env"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
const [prompt, setPrompt] = useState('renaissance painting of a figure giving two thumbs up');
const [prediction, setPrediction] = useState(null);
const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null)
      const interactionId = await newrelic.startInteraction('StartPredictionCall');
      const response = await fetch(`${API_URL}/predictions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
      
      let prediction = await response.json();
      if (response.status !== 201) {
        setError(prediction.detail);
        newrelic.endInteraction(interactionId);
        return;
      }
      setPrediction(prediction);

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch(`${API_URL}/predictions` + prediction.id);
        prediction = await response.json();
        if (response.status !== 200) {
          setError(prediction.detail);
          newrelic.endInteraction(interactionId);
          return;
        }
        setPrediction(prediction);
        newrelic.endInteraction(interactionId);
      }
    } catch (error) {
      newrelic.endInteraction(interactionId);
      Logger.error(error)
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        Dream something with stability-ai/stable-diffusion
      </Text>

      <TextInput
        className={'border py-2 px-3'}
        placeholder="Enter a prompt to display an image"
        onChangeText={(text) => setPrompt(text)}
        value={prompt}
      />
      <Button
        className={'bg-sky-500/100'}
        title="Generate"
        onPress={handleSubmit}
        disabled={prediction && prediction.status != 'succeeded'} />

      {error && <Text>{error}</Text>}

      {prediction && (
        <View>
          {prediction.output && (
            <>
              <Image
                source={{ uri: prediction.output[prediction.output.length - 1] }}
                style={{ width: 400, height: 400 }}
                />
              <ConfettiCannon
                count={200}
                origin={{x: 0, y: 0}}
                autoStart={true}
              />
            </>
          )}
          <Text>status: {prediction.status}</Text>
        </View>
      )}
    </View>
  );
}
