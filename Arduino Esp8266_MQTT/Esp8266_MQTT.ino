#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
int sensor = A0; // Variável de leitura analógica do sensor FSR no pino A0 da placa

/************ Configuração de Ponto de Acesso WiFi ********/

#define WLAN_SSID       "LeCircuit" // WiFi
#define WLAN_PASS       "projetos3" // Senha

/** Configuração do Servidor utilizado para enviar mensagem **/

#define AIO_SERVER      "io.adafruit.com" //Endereço do servidor
#define AIO_SERVERPORT  1883                   // Porta do Servidor
#define AIO_USERNAME    "lecircuit1" // Usuario criado
#define AIO_KEY         "13bfed0eff764944a17783ac6d66b919" // chave de acesso

/************ Status Global ******************/

// Criada uma classe ESP8266 WiFiClient para conectar ao servidor MQTT.
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY); // Configurar conexão ao servidor

/*********** Configurar Tópico definido para os Dados *************/
Adafruit_MQTT_Publish medicao = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/force"); //Armazenar no tópico "/feeds/force"

/***** Codigo Principal *****/
void MQTT_connect(); // Iniciar protocolo MQTT

void setup() { 
  pinMode(sensor, INPUT); // Iniciar pino do sensor FSR

  WiFi.begin(WLAN_SSID, WLAN_PASS); // Iniciar conexão WiFi com SSID e Senha configurados
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}
uint32_t x=0;

void loop() {
  MQTT_connect(); // Realizar conexão com o broker
  
  int force_value = analogRead(sensor); // Variável que armazena leitura analógica do sensor

  int message=force_value/540// Converter para porcentagem do total da vasilha cheia
(100% = 540)
  medicao.publish(message) // Publicar mensagem para o servidor(Broker)
  
  delay(2000); // Delay de 2s para cada mensagem enviada
  
void MQTT_connect() { // Função padrão para conetar via protocolo MQTT
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
       if (retries == 0) {
         // basically die and wait for WDT to reset me
         while (1);
       }
  }
}
