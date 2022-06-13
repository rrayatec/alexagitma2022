const Alexa = require('ask-sdk-core');
const axios = require("axios");
const accountSid = 'AC495cb93d4dc9047b189a9821fd73b237'; 
const authToken = '90a94f35ad97119886a7fef310412832'; 
const client = require('twilio')(accountSid, authToken); 
//user info
const nombre = "Rubén, "
const full_nombre = "Rubén Raya"
const email = "rraya@ndscognitivelabs.com"
const cp = "55 200"
const phone = "55 14 20 05 81"
let apiLocationPhone= "https://maps.googleapis.com/maps/api/geocode/json?latlng=19.5235595703125,-99.04136203130344&key=AIzaSyBd66OtBhr5ZpCoEVBg3YfzEHMyWw85QqQ";
let _locationPhone= "Cerrada de Pueblo Nuevo número 16, Colonia Emiliano Zapata primera Sección, código postal 55 200,  Ecatepec de Morelos, Mexico";
let _lat="19.5235595703125";
let _long = "-99.04136203130344";
let _dbfolio = "13 51";
//info seguros
let _marca, _submarca, _ano, _letra, _letranumero, _folio = "";
let _ultimaPeticion ="";
//slaudos
const saludoInicial = 'Gracias por comunicarte con tu asistente virtual Quálitas. ¿En qué te puedo ayudar?';
const infoSeguro = "En Quálitas contamos con una gran variedad de opciones que se adaptan a tus necesidades, para poder brindarte información personalizada te pedire algunos datos, por favor me podrias decir tu nombre completo."
const repromptText = "¿Te apuedo ayudar en algo más?"

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        //console.log("-----inicio")
        //console.log(handlerInput.requestEnvelope.context)
        //var geoObject = handlerInput.requestEnvelope.context.Geolocation;
        //_lat =  geoObject.coordinate.latitudeInDegrees;
        //_long = geoObject.coordinate.longitudeInDegrees;
        
        const speakOutput = saludoInicial;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withStandardCard("", saludoInicial , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .getResponse();
    }
};

const SaludoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SaludoIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¡Hola! Soy tu asistente virtual Quálitas. ¿Qué puedo hacer por ti?';
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("")
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {

        const speakOutput = `Adelante. ¿En qué te puedo ayudar?`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt("")
            .getResponse();
    }
};




const InProgressInfoSeguroIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'InfosegurosIntentUNO' &&
      request.intent.name === 'InfosegurosIntentDOS' &&
      request.intent.name === 'InfosegurosIntentTRES' &&
      request.intent.name === 'InfosegurosIntentCUATRO' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const InfosegurosIntentUNO = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfosegurosIntentUNO';
    },
    handle(handlerInput) {
        const speakOutput = `¡Muchas gracias ${nombre}, ¿podrias decirme la marca de tu auto?`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt('${nombre}, me podrias repetir la marca de tu auto por favor.')
            .getResponse();
    }
};

const InfosegurosIntentDOS = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfosegurosIntentDOS';
    },
    handle(handlerInput) {
        
        const speakOutput = `¿Me podrias indicar la submarca o tipo de tu auto?`;
        _ultimaPeticion = speakOutput;
        
        _marca = handlerInput.requestEnvelope.request.intent.slots.marca.value;
        console.log("-> _marca")
        console.log(_marca)
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", _marca.toUpperCase().replace("á","A").replace("Á","A") , "https://img2.freepng.es/20180803/lg/kisspng-audi-car-vector-graphics-logo-auto-union-5b651dfb6e4974.4569412315333534674517.jpg")
            .reprompt(`${nombre}, me podrias repetir la submarca o tipo de tu auto por favor.`)
            .getResponse();
    }
};

const InfosegurosIntentTRES = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfosegurosIntentTRES';
    },
    handle(handlerInput) {
        
        const speakOutput = `¡Muy bien! ¿Qué año es tu auto?`;
        _ultimaPeticion = speakOutput;
        
        _submarca = handlerInput.requestEnvelope.request.intent.slots.submarca.value;
        _letra = handlerInput.requestEnvelope.request.intent.slots.letra.value;
        _letranumero = handlerInput.requestEnvelope.request.intent.slots.letranumero.value;
        
        console.log("_submarca")
        console.log(_submarca)
        console.log(_letra)
        console.log(_letranumero)
        console.log("<------------>")
        
        if ((_submarca !== undefined)){
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", (_marca.toUpperCase().replace("á","A").replace("Á","A") +" "+_submarca ) , "https://img2.freepng.es/20181113/brt/kisspng-audi-a2-car-audi-quattro-audi-s5-new-audi-audi-tt-rs-for-sale-essex-audi-amp-m25-5bea8166a03d34.5345097915420952066563.jpg")
            .reprompt(`${nombre}, ¿me podrias repetir Qué año o modelo es tu auto por favor?`)
            .getResponse();
        }
        
         if(_letra !== undefined && _letranumero !== undefined){
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", (_marca.toUpperCase().replace("á","A").replace("Á","A")  +" "+_letra.toUpperCase()+_letranumero ) , "https://img2.freepng.es/20181113/brt/kisspng-audi-a2-car-audi-quattro-audi-s5-new-audi-audi-tt-rs-for-sale-essex-audi-amp-m25-5bea8166a03d34.5345097915420952066563.jpg")
            .reprompt(`${nombre}. Me podrias repetir, ¿Qué año o modelo es tu auto por favor?`)
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak(`${nombre}. Me podrias repetir, ¿Qué año o modelo es tu auto por favor?`)
            .reprompt(`${nombre}. Me podrias repetir, ¿Qué año o modelo es tu auto por favor?`)
            .getResponse();
    }
};

const InfosegurosIntentCUATRO = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfosegurosIntentCUATRO';
    },
    handle(handlerInput) {
        
        _ano = handlerInput.requestEnvelope.request.intent.slots.ano.value;
        if (_ano === undefined){_ano = "2019"}
        if (_marca === undefined){_marca = "AUDI"}
        if (_letra === undefined){_letra = "A"}
        if (_letranumero === undefined){_letranumero = "2"}
        console.log("_ano.......")
        console.log(_ano)
        
        const speakOutput = `¡Hemos terminado! Muchas gracias Rubén, te confirmo la información proporcionada: Tu auto es un ${_marca.toUpperCase().replace("á","A").replace("Á","A")} ${_letra.toUpperCase()+_letranumero}, año ${_ano}, tu código postal es ${cp}, te contactaremos al número de telefono ${phone}. ¿Esta información es correcta?`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", `${full_nombre}, te confirmo la información proporcionada: Tu auto es un ${_marca.toUpperCase().replace("á","A").replace("Á","A")} ${_letra.toUpperCase()+_letranumero}, año ${_ano}, tu código postal es ${cp} y te podemos contactar al ${phone}. ¿Esta información es correcta?`, "https://img2.freepng.es/20181113/brt/kisspng-audi-a2-car-audi-quattro-audi-s5-new-audi-audi-tt-rs-for-sale-essex-audi-amp-m25-5bea8166a03d34.5345097915420952066563.jpg")
            .reprompt(`${nombre}. ¿Es correcta la información?`)
            .getResponse();
    }
};

const InfosegurosIntentEND = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfosegurosIntentEND';
    },
    handle(handlerInput) {
        const speakOutput = `¡Excelente!, Estamos generando la información para ti y en un momento nos pondremos en contacto contigo.¡Muchas gracias por contactar a Quálitas.`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt(repromptText)
            .getResponse();
    }
};




const InProgressBuscarGruaIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'BuscarGruaIntentUNO' &&
      request.intent.name === 'BuscarGruaIntentDOS' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
      .getResponse();
  },
};


const BuscarGruaIntentUNO = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuscarGruaIntentUNO';
    },
    handle(handlerInput) {
        
        const speakOutput = `Claro, con todo gusto. ¿Me indicas tu núnero de reporte?`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt(`${nombre}, ¿me podrias repetir el fólio favor?`)
            .getResponse();
    }
};

const BuscarGruaIntentDOS = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuscarGruaIntentDOS';
    },
    handle(handlerInput) {
        
        _folio = handlerInput.requestEnvelope.request.intent.slots.buscargruanumber.value;
        _folio = _folio.match(/.{1,2}/g)
        _folio = _folio[0]+" "+_folio[1];
        
        //if (_folio !== _dbfolio){_folio = _dbfolio }
        
        const speakOutput = "Gracias Rubén. La grúa ya va en camino y estará llegando a tu ubicación en un tiempo aproximado de 20 minutos. Gracias por comunicarte con tu asistente virtual Quálitas";
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("Fólio: "+_folio, speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt("")
            .getResponse();
    }
};



const EnviarInformacionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnviarInformacionIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = `Te enviaremos mas información vía Whatsapp`;
        sendVideo()
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt("")
            .getResponse();
    }
};



const InProgressUpdateSeguroIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'ActualizarSeguroIntentUNO' &&
      request.intent.name === 'ActualizarSeguroIntentDOS' &&
      request.intent.name === 'ActualizarSeguroIntentEND' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
        .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const ActualizarSeguroIntentUNO = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActualizarSeguroIntentUNO';
    },
    handle(handlerInput) {
        
        const speakOutput = `Para renovar tu seguro indícame tu número de póliza.`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt(`${nombre}, ¿me podrias repetir el fólio de su póliza por favor?`)
            .getResponse();
    }
};

const ActualizarSeguroIntentDOS = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActualizarSeguroIntentDOS';
    },
    handle(handlerInput) {
        
        _folio = handlerInput.requestEnvelope.request.intent.slots.asnumber.value;
        _folio = _folio.match(/.{1,2}/g)
        _folio = _folio[0]+" "+_folio[1]+" "+_folio[2];
        //if (_folio !== "19 50 06"){_folio = "19 50 06"}
        
        const speakOutput = `Los datos proporcionados para la renovación son: número de póliza ${_folio}, número telefónico ${phone}. Tu nueva póliza tiene un costo anual de $10,000. ¿Deseas renovar ahora?`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt('¿Deseas renovar ahora?')
            .getResponse();
    }
};

const ActualizarSeguroIntentEND = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActualizarSeguroIntentEND';
    },
    handle(handlerInput) {
        
        const speakOutput = `¡Excelente! En breve te enviaremos tu nueva póliza por Whatsapp. ¡Muchas gracias por contactar a Quálitas.`;
        _ultimaPeticion = speakOutput;
        sendPoliza("https://www.qualitas.com.mx/documents/20602/44158/Pol%C3%ADtica+y+Procedimientos+Generales+del+Ajustador+p%C3%A1gina+p%C3%BAblica+.pdf/79a3ec23-e54c-47b8-aabb-64bb30551972");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt("")
            .getResponse();
    }
};


const SiniestroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SiniestroIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Entendido. A la brevedad uno de nuestros agentes de Quálitas se  pondrá en contacto con usted para apoyarle en la dirección.: '+_locationPhone;
        _ultimaPeticion = speakOutput;
        
        sendSiniestroInfo('A la brevedad uno de nuestros agentes de Quálitas se  pondrá en contacto con usted para apoyarle en la dirección.: '+_locationPhone);
        sendSiniestroLocation(_lat+","+_long);
        
        sendMessage('Este es el reporte de tu siniestro.')
        
        sendPoliza("https://www.qualitas.com.mx/documents/20602/44158/Pol%C3%ADtica+y+Procedimientos+Generales+del+Ajustador+p%C3%A1gina+p%C3%BAblica+.pdf/79a3ec23-e54c-47b8-aabb-64bb30551972")
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard(`Reporte: ${_dbfolio}`,speakOutput, "")
            //.reprompt("")
            .getResponse();
    }
};

const UbicarSiniestroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UbicarSiniestroIntent';
    },
    handle(handlerInput) {
    
        const speakOutput = `Para darle un tiempo aproximado, ocupare el número de fólio: ${_dbfolio}, a nombre de ${full_nombre}, El ajustador Rodrigo Solana, estará llegando a su ubicación en un tiempo aproximado de 20 minutos.`;
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard(_dbfolio,speakOutput, "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt("")
            .getResponse();
    }
};





const GroseriaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GroseriaIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = "No te entendí, ¿podrias volver a repetir?";
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt(repromptText)
            .getResponse();
    }
};
const GraciasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GraciasIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Es un placer ayudarte, recuerda que en Quálitas estamos para servirte las 24hrs del día. Hasta pronto';
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt("")
            .getResponse();
    }
};
const NoGraciasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoGraciasIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hasta pronto.';
        _ultimaPeticion = speakOutput;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt("")
            .getResponse();
    }
};
const EsperaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EsperaIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'De acuerdo';
        _ultimaPeticion = speakOutput;
        return handlerInput.responseBuilder
            .speak("Esperando......")
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            //.reprompt(repromptText)
            .getResponse();
    }
};
const AdiosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdiosIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Gracias por comunicarte con tu asistente virtual Quálitas.';
        _ultimaPeticion = speakOutput;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard("", speakOutput , "https://cotizator.com/wp-content/uploads/2018/03/Qualitas-logo-e1581441152632.png")
            .reprompt("")
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Que tengas un excelente día!';

        return handlerInput.responseBuilder
            .speak("")
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'No comprendí su anterior petición. Recuerde que se le puede apoyar en información de seguros, reporte de seguimientos o procesos de renovaciones.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("")
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'No obtuve respuesta. ' +_ultimaPeticion;
        //console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt("no escuhe bien")
        .getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = "No entendi tu respuesta, "+_ultimaPeticion;
        console.log(`año -> ${_ano}`);
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

async function sendSiniestroInfo(_message_) {
    
    return new Promise((resolve, reject) => {
        
    client.messages 
      .create({ 
         body: _message_, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
        setTimeout(() => {
      resolve();
    }, 1000);
  
  
    });
}

async function sendMessage(_message_) {
    
    return new Promise((resolve, reject) => {
        
    client.messages 
      .create({ 
         body: _message_, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581'
       }) 
      .then(message => console.log(message.sid)) 
      .done();
 setTimeout(() => {
      resolve();
    }, 3000);
    });
}

async function sendVideo() {
    
    return new Promise((resolve, reject) => {
    
    client.messages 
      .create({ 
         body: "Puedes consultar más información en nuestra pagina oficial", 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581'

       }) 
      .then(message => console.log(message.sid)) 
      .done();
 setTimeout(() => {
      resolve();
    }, 1000);
    
    client.messages 
      .create({ 
         body: "https://qualitasautoseguros.mx", 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581'

       }) 
      .then(message => console.log(message.sid)) 
      .done();
 setTimeout(() => {
      resolve();
    }, 2000);
    
    client.messages 
      .create({ 
         body: "https://www.youtube.com/watch?v=mkzyrNxo6GU", 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581'

       }) 
      .then(message => console.log(message.sid)) 
      .done();
 setTimeout(() => {
      resolve();
    }, 3000);
    
    });
}

async function sendPoliza(_message_url_) {
    
    return new Promise((resolve, reject) => {
        
    client.messages 
      .create({ 
         body: "Reporte de siniestro", 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581',
         mediaUrl: [_message_url_],

       }) 
      .then(message => console.log(message.sid)) 
      .done();
 setTimeout(() => {
      resolve();
    }, 3000);
    });
}

async function sendSiniestroLocation(_message_) {
    
    return new Promise((resolve, reject) => {
        
    client.messages 
      .create({ 
         body: _message_, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5215514200581',
         persistentAction: `geo:${_message_}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    setTimeout(() => {
      resolve();
    }, 3000);
    });
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        
        InProgressInfoSeguroIntentHandler,
        InfosegurosIntentUNO,
        InfosegurosIntentDOS,
        InfosegurosIntentTRES,
        InfosegurosIntentCUATRO,
        InfosegurosIntentEND,
        
        InProgressUpdateSeguroIntentHandler,
        ActualizarSeguroIntentUNO,
        ActualizarSeguroIntentDOS,
        ActualizarSeguroIntentEND,
        
        InProgressBuscarGruaIntentHandler,
        BuscarGruaIntentUNO,
        BuscarGruaIntentDOS,
        
        SiniestroIntentHandler,
        UbicarSiniestroIntentHandler,
        
        EnviarInformacionIntentHandler,
        
        EsperaIntentHandler,
        NoGraciasIntentHandler,
        
        GraciasIntentHandler,
        AdiosIntentHandler,
        GroseriaIntentHandler,
        SaludoIntentHandler,
        
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    //.withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
