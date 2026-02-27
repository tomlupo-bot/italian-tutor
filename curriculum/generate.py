import json

units = []

# ============ A2 UNITS (1-20) ============

units.append({
    "unit": 1, "level": "A2", "theme": "Presentarsi", "theme_en": "Introducing Yourself",
    "grammar_point": "Verbo essere + mi chiamo",
    "vocab": [
        {"it": "mi chiamo", "en": "my name is", "example": "Mi chiamo Marco."},
        {"it": "sono", "en": "I am", "example": "Sono italiano."},
        {"it": "piacere", "en": "nice to meet you", "example": "Piacere, mi chiamo Anna."},
        {"it": "di dove sei?", "en": "where are you from?", "example": "Di dove sei? Sono di Roma."},
        {"it": "abito a", "en": "I live in", "example": "Abito a Milano."},
        {"it": "ho ... anni", "en": "I am ... years old", "example": "Ho venticinque anni."},
        {"it": "vengo da", "en": "I come from", "example": "Vengo da Londra."},
        {"it": "come stai?", "en": "how are you?", "example": "Ciao, come stai?"},
        {"it": "bene, grazie", "en": "fine, thanks", "example": "Sto bene, grazie."},
        {"it": "e tu?", "en": "and you?", "example": "Io sto bene, e tu?"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ chiamo Marco.", "answer": "Mi"},
        {"type": "fill", "sentence": "Di dove _____? Sono di Roma.", "answer": "sei"},
        {"type": "fill", "sentence": "Ho venticinque _____.", "answer": "anni"}
    ],
    "scenario": {
        "title": "At a café in Trastevere",
        "setup": "You sit down at a bar. Someone starts chatting.",
        "opening": "Ciao! Sei di Roma?",
        "goal": "Introduce yourself using this unit's vocab"
    }
})

units.append({
    "unit": 2, "level": "A2", "theme": "Famiglia", "theme_en": "Family",
    "grammar_point": "Aggettivi possessivi + articoli con famiglia",
    "vocab": [
        {"it": "la madre", "en": "mother", "example": "Mia madre si chiama Maria."},
        {"it": "il padre", "en": "father", "example": "Mio padre lavora in banca."},
        {"it": "il fratello", "en": "brother", "example": "Ho un fratello maggiore."},
        {"it": "la sorella", "en": "sister", "example": "Mia sorella ha vent'anni."},
        {"it": "i nonni", "en": "grandparents", "example": "I miei nonni vivono in campagna."},
        {"it": "lo zio", "en": "uncle", "example": "Mio zio abita a Napoli."},
        {"it": "la zia", "en": "aunt", "example": "La zia prepara la torta."},
        {"it": "il cugino", "en": "cousin (m)", "example": "Il mio cugino è simpatico."},
        {"it": "maggiore", "en": "older", "example": "Sono il fratello maggiore."},
        {"it": "minore", "en": "younger", "example": "La sorella minore è a scuola."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ madre si chiama Maria.", "answer": "Mia"},
        {"type": "fill", "sentence": "Ho un _____ maggiore.", "answer": "fratello"},
        {"type": "fill", "sentence": "I miei _____ vivono in campagna.", "answer": "nonni"}
    ],
    "scenario": {
        "title": "Family dinner in Bologna",
        "setup": "Your Italian friend is introducing you to their family at Sunday lunch.",
        "opening": "Ti presento la mia famiglia! Questo è mio padre.",
        "goal": "Ask about and describe family members"
    }
})

units.append({
    "unit": 3, "level": "A2", "theme": "Numeri/Età", "theme_en": "Numbers and Age",
    "grammar_point": "Avere + numeri cardinali",
    "vocab": [
        {"it": "quanti anni hai?", "en": "how old are you?", "example": "Quanti anni hai?"},
        {"it": "venti", "en": "twenty", "example": "Ho venti anni."},
        {"it": "trenta", "en": "thirty", "example": "Mio fratello ha trent'anni."},
        {"it": "quaranta", "en": "forty", "example": "Mia madre ha quarant'anni."},
        {"it": "cento", "en": "one hundred", "example": "La nonna ha quasi cento anni."},
        {"it": "il numero", "en": "number", "example": "Qual è il tuo numero di telefono?"},
        {"it": "il compleanno", "en": "birthday", "example": "Il mio compleanno è in maggio."},
        {"it": "quanto costa?", "en": "how much does it cost?", "example": "Quanto costa questo?"},
        {"it": "primo", "en": "first", "example": "È il mio primo giorno."},
        {"it": "secondo", "en": "second", "example": "Abito al secondo piano."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Quanti _____ hai?", "answer": "anni"},
        {"type": "fill", "sentence": "Mio fratello ha _____'anni.", "answer": "trent"},
        {"type": "fill", "sentence": "Quanto _____ questo?", "answer": "costa"}
    ],
    "scenario": {
        "title": "At the market in Palermo",
        "setup": "You're buying fruit at an outdoor market and need to ask prices.",
        "opening": "Buongiorno! Desidera?",
        "goal": "Use numbers for prices and quantities"
    }
})

units.append({
    "unit": 4, "level": "A2", "theme": "Colori/Descrizioni", "theme_en": "Colors and Descriptions",
    "grammar_point": "Accordo aggettivo-nome (genere e numero)",
    "vocab": [
        {"it": "rosso", "en": "red", "example": "La macchina rossa è bella."},
        {"it": "blu", "en": "blue", "example": "Il cielo è blu."},
        {"it": "verde", "en": "green", "example": "Mi piace la maglietta verde."},
        {"it": "grande", "en": "big", "example": "La casa è grande."},
        {"it": "piccolo", "en": "small", "example": "Ho un cane piccolo."},
        {"it": "bello", "en": "beautiful", "example": "Che bel vestito!"},
        {"it": "brutto", "en": "ugly", "example": "Il tempo è brutto oggi."},
        {"it": "nuovo", "en": "new", "example": "Ho comprato un telefono nuovo."},
        {"it": "vecchio", "en": "old", "example": "Questa chiesa è molto vecchia."},
        {"it": "chiaro", "en": "light (color)", "example": "Preferisco il verde chiaro."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "La macchina _____ è bella.", "answer": "rossa"},
        {"type": "fill", "sentence": "Ho un cane _____.", "answer": "piccolo"},
        {"type": "fill", "sentence": "Questa chiesa è molto _____.", "answer": "vecchia"}
    ],
    "scenario": {
        "title": "Shopping in Via del Corso",
        "setup": "You're in a clothing store looking for a gift.",
        "opening": "Buongiorno, posso aiutarla? Cerca qualcosa di particolare?",
        "goal": "Describe items using colors and adjectives"
    }
})

units.append({
    "unit": 5, "level": "A2", "theme": "Cibo/Bevande", "theme_en": "Food and Drinks",
    "grammar_point": "Vorrei + partitivo (del, della, dei)",
    "vocab": [
        {"it": "la pizza", "en": "pizza", "example": "Vorrei una pizza margherita."},
        {"it": "la pasta", "en": "pasta", "example": "La pasta è al dente."},
        {"it": "il caffè", "en": "coffee", "example": "Prendo un caffè, grazie."},
        {"it": "l'acqua", "en": "water", "example": "Un'acqua naturale, per favore."},
        {"it": "il vino", "en": "wine", "example": "Un bicchiere di vino rosso."},
        {"it": "il pane", "en": "bread", "example": "Vorrei del pane fresco."},
        {"it": "il formaggio", "en": "cheese", "example": "Il parmigiano è delizioso."},
        {"it": "la carne", "en": "meat", "example": "Non mangio la carne."},
        {"it": "la verdura", "en": "vegetables", "example": "Mangio molta verdura."},
        {"it": "il dolce", "en": "dessert", "example": "Come dolce prendo il tiramisù."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ una pizza margherita.", "answer": "Vorrei"},
        {"type": "fill", "sentence": "Un bicchiere _____ vino rosso.", "answer": "di"},
        {"type": "fill", "sentence": "Non mangio la _____.", "answer": "carne"}
    ],
    "scenario": {
        "title": "Trattoria in Florence",
        "setup": "You enter a small family restaurant for lunch.",
        "opening": "Benvenuto! Si accomodi. Ecco il menù.",
        "goal": "Order food and drinks using vorrei and partitivo"
    }
})

units.append({
    "unit": 6, "level": "A2", "theme": "Casa", "theme_en": "Home",
    "grammar_point": "C'è / Ci sono + preposizioni di luogo",
    "vocab": [
        {"it": "la cucina", "en": "kitchen", "example": "La cucina è grande."},
        {"it": "il bagno", "en": "bathroom", "example": "Il bagno è al primo piano."},
        {"it": "la camera da letto", "en": "bedroom", "example": "La camera da letto è luminosa."},
        {"it": "il salotto", "en": "living room", "example": "Guardiamo la TV in salotto."},
        {"it": "il balcone", "en": "balcony", "example": "C'è un balcone con vista sul mare."},
        {"it": "il tavolo", "en": "table", "example": "Il tavolo è in cucina."},
        {"it": "la sedia", "en": "chair", "example": "Ci sono quattro sedie."},
        {"it": "il divano", "en": "sofa", "example": "Mi siedo sul divano."},
        {"it": "la finestra", "en": "window", "example": "Apri la finestra, per favore."},
        {"it": "il piano", "en": "floor/storey", "example": "Abito al terzo piano."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ un balcone con vista sul mare.", "answer": "C'è"},
        {"type": "fill", "sentence": "_____ quattro sedie.", "answer": "Ci sono"},
        {"type": "fill", "sentence": "La cucina è _____.", "answer": "grande"}
    ],
    "scenario": {
        "title": "Apartment hunting in Milan",
        "setup": "You're viewing a flat with the landlord.",
        "opening": "Ecco l'appartamento. Questo è l'ingresso.",
        "goal": "Describe rooms and furniture using c'è/ci sono"
    }
})

units.append({
    "unit": 7, "level": "A2", "theme": "Vestiti", "theme_en": "Clothing",
    "grammar_point": "Dimostrativo questo/quello + taglie",
    "vocab": [
        {"it": "la maglietta", "en": "t-shirt", "example": "Questa maglietta è troppo grande."},
        {"it": "i pantaloni", "en": "trousers", "example": "Quei pantaloni costano troppo."},
        {"it": "le scarpe", "en": "shoes", "example": "Mi piacciono quelle scarpe."},
        {"it": "la giacca", "en": "jacket", "example": "Ho bisogno di una giacca nuova."},
        {"it": "il vestito", "en": "dress/suit", "example": "Che bel vestito!"},
        {"it": "la taglia", "en": "size", "example": "Che taglia porti?"},
        {"it": "provare", "en": "to try on", "example": "Posso provare questo?"},
        {"it": "stretto", "en": "tight", "example": "Questi pantaloni sono stretti."},
        {"it": "largo", "en": "loose/wide", "example": "La giacca è troppo larga."},
        {"it": "lo sconto", "en": "discount", "example": "C'è uno sconto del venti per cento."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Che _____ porti?", "answer": "taglia"},
        {"type": "fill", "sentence": "Posso _____ questo?", "answer": "provare"},
        {"type": "fill", "sentence": "Questi pantaloni sono _____.", "answer": "stretti"}
    ],
    "scenario": {
        "title": "Boutique in Naples",
        "setup": "You're shopping for clothes and need help from the shop assistant.",
        "opening": "Buongiorno! Cerca qualcosa?",
        "goal": "Ask about sizes, try things on, describe fit"
    }
})

units.append({
    "unit": 8, "level": "A2", "theme": "Giorni/Mesi", "theme_en": "Days and Months",
    "grammar_point": "Preposizioni temporali (a, in, di, il)",
    "vocab": [
        {"it": "lunedì", "en": "Monday", "example": "Il lunedì vado in palestra."},
        {"it": "venerdì", "en": "Friday", "example": "Venerdì sera usciamo."},
        {"it": "il fine settimana", "en": "weekend", "example": "Cosa fai il fine settimana?"},
        {"it": "gennaio", "en": "January", "example": "In gennaio fa freddo."},
        {"it": "agosto", "en": "August", "example": "In agosto andiamo al mare."},
        {"it": "la settimana", "en": "week", "example": "La prossima settimana ho un esame."},
        {"it": "il mese", "en": "month", "example": "Questo mese è corto."},
        {"it": "oggi", "en": "today", "example": "Oggi è martedì."},
        {"it": "domani", "en": "tomorrow", "example": "Domani andiamo al cinema."},
        {"it": "ieri", "en": "yesterday", "example": "Ieri ho lavorato tutto il giorno."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ gennaio fa freddo.", "answer": "In"},
        {"type": "fill", "sentence": "Il _____ vado in palestra.", "answer": "lunedì"},
        {"type": "fill", "sentence": "Cosa fai il fine _____?", "answer": "settimana"}
    ],
    "scenario": {
        "title": "Planning a trip with friends",
        "setup": "You're on a call with an Italian friend planning a holiday.",
        "opening": "Allora, quando partiamo? Io sono libero in agosto.",
        "goal": "Discuss dates using days, months, and time prepositions"
    }
})

units.append({
    "unit": 9, "level": "A2", "theme": "Professioni", "theme_en": "Professions",
    "grammar_point": "Fare + il/la + professione",
    "vocab": [
        {"it": "il medico", "en": "doctor", "example": "Faccio il medico."},
        {"it": "l'insegnante", "en": "teacher", "example": "Mia madre fa l'insegnante."},
        {"it": "l'avvocato", "en": "lawyer", "example": "Mio zio è avvocato."},
        {"it": "l'ingegnere", "en": "engineer", "example": "Lavoro come ingegnere."},
        {"it": "il cuoco", "en": "cook/chef", "example": "Il cuoco è molto bravo."},
        {"it": "il cameriere", "en": "waiter", "example": "Il cameriere è gentile."},
        {"it": "lavorare", "en": "to work", "example": "Lavoro in un ufficio."},
        {"it": "l'ufficio", "en": "office", "example": "Il mio ufficio è in centro."},
        {"it": "lo stipendio", "en": "salary", "example": "Lo stipendio è buono."},
        {"it": "il collega", "en": "colleague", "example": "I miei colleghi sono simpatici."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Faccio _____ medico.", "answer": "il"},
        {"type": "fill", "sentence": "_____ in un ufficio.", "answer": "Lavoro"},
        {"type": "fill", "sentence": "I miei _____ sono simpatici.", "answer": "colleghi"}
    ],
    "scenario": {
        "title": "Networking at a conference in Turin",
        "setup": "You're at a professional mixer and people are introducing themselves.",
        "opening": "Piacere! Che lavoro fai?",
        "goal": "Describe your job and ask about others' professions"
    }
})

units.append({
    "unit": 10, "level": "A2", "theme": "Trasporti", "theme_en": "Transportation",
    "grammar_point": "Andare + in/a/con + mezzo di trasporto",
    "vocab": [
        {"it": "il treno", "en": "train", "example": "Prendo il treno per Roma."},
        {"it": "l'autobus", "en": "bus", "example": "L'autobus arriva alle otto."},
        {"it": "la macchina", "en": "car", "example": "Vado in macchina al lavoro."},
        {"it": "la bicicletta", "en": "bicycle", "example": "Vado in bicicletta al parco."},
        {"it": "l'aereo", "en": "airplane", "example": "Prendiamo l'aereo domani."},
        {"it": "il biglietto", "en": "ticket", "example": "Ho comprato il biglietto online."},
        {"it": "la stazione", "en": "station", "example": "La stazione è vicina."},
        {"it": "l'orario", "en": "timetable/schedule", "example": "Controlla l'orario dei treni."},
        {"it": "in ritardo", "en": "late/delayed", "example": "Il treno è in ritardo."},
        {"it": "a piedi", "en": "on foot", "example": "Vado a piedi al supermercato."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Vado _____ macchina al lavoro.", "answer": "in"},
        {"type": "fill", "sentence": "Il treno è in _____.", "answer": "ritardo"},
        {"type": "fill", "sentence": "Ho comprato il _____ online.", "answer": "biglietto"}
    ],
    "scenario": {
        "title": "Termini Station in Rome",
        "setup": "You need to buy a train ticket to Naples.",
        "opening": "Buongiorno. Dove vuole andare?",
        "goal": "Buy tickets and ask about schedules"
    }
})

units.append({
    "unit": 11, "level": "A2", "theme": "Tempo libero", "theme_en": "Free Time",
    "grammar_point": "Mi piace / Mi piacciono + infinito",
    "vocab": [
        {"it": "leggere", "en": "to read", "example": "Mi piace leggere la sera."},
        {"it": "guardare la TV", "en": "to watch TV", "example": "Guardiamo la TV dopo cena."},
        {"it": "ascoltare musica", "en": "to listen to music", "example": "Ascolto musica italiana."},
        {"it": "fare sport", "en": "to do sport", "example": "Faccio sport tre volte a settimana."},
        {"it": "cucinare", "en": "to cook", "example": "Mi piace cucinare la pasta."},
        {"it": "uscire", "en": "to go out", "example": "Stasera usciamo con gli amici."},
        {"it": "il cinema", "en": "cinema", "example": "Andiamo al cinema sabato?"},
        {"it": "il libro", "en": "book", "example": "Sto leggendo un bel libro."},
        {"it": "la passeggiata", "en": "walk/stroll", "example": "Facciamo una passeggiata?"},
        {"it": "divertirsi", "en": "to have fun", "example": "Mi diverto molto a ballare."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Mi _____ leggere la sera.", "answer": "piace"},
        {"type": "fill", "sentence": "Faccio sport tre _____ a settimana.", "answer": "volte"},
        {"type": "fill", "sentence": "Facciamo una _____?", "answer": "passeggiata"}
    ],
    "scenario": {
        "title": "Weekend plans in Verona",
        "setup": "Your roommate asks what you want to do this weekend.",
        "opening": "Che facciamo questo fine settimana? Io non ho programmi.",
        "goal": "Discuss hobbies and suggest weekend activities"
    }
})

units.append({
    "unit": 12, "level": "A2", "theme": "Città", "theme_en": "City",
    "grammar_point": "Preposizioni articolate (al, alla, nel, nella)",
    "vocab": [
        {"it": "la piazza", "en": "square", "example": "Ci vediamo in piazza."},
        {"it": "la chiesa", "en": "church", "example": "La chiesa è molto antica."},
        {"it": "il museo", "en": "museum", "example": "Il museo è aperto fino alle sei."},
        {"it": "la farmacia", "en": "pharmacy", "example": "La farmacia è all'angolo."},
        {"it": "il supermercato", "en": "supermarket", "example": "Vado al supermercato."},
        {"it": "la banca", "en": "bank", "example": "La banca chiude alle tre."},
        {"it": "vicino a", "en": "near", "example": "Abito vicino alla stazione."},
        {"it": "lontano da", "en": "far from", "example": "Il museo è lontano da qui."},
        {"it": "a destra", "en": "to the right", "example": "Gira a destra al semaforo."},
        {"it": "a sinistra", "en": "to the left", "example": "La farmacia è a sinistra."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Abito vicino _____ stazione.", "answer": "alla"},
        {"type": "fill", "sentence": "Gira a _____ al semaforo.", "answer": "destra"},
        {"type": "fill", "sentence": "Il museo è _____ da qui.", "answer": "lontano"}
    ],
    "scenario": {
        "title": "Lost in Venice",
        "setup": "You're looking for Piazza San Marco and ask a local for directions.",
        "opening": "Scusi, sa dov'è Piazza San Marco?",
        "goal": "Ask for and give directions in a city"
    }
})

units.append({
    "unit": 13, "level": "A2", "theme": "Fare la spesa", "theme_en": "Grocery Shopping",
    "grammar_point": "Partitivo + quantità (un chilo di, un litro di)",
    "vocab": [
        {"it": "la frutta", "en": "fruit", "example": "Compro la frutta al mercato."},
        {"it": "la mela", "en": "apple", "example": "Vorrei un chilo di mele."},
        {"it": "il latte", "en": "milk", "example": "Mi serve un litro di latte."},
        {"it": "le uova", "en": "eggs", "example": "Prendo una dozzina di uova."},
        {"it": "il sacchetto", "en": "bag", "example": "Ha bisogno di un sacchetto?"},
        {"it": "lo scontrino", "en": "receipt", "example": "Ecco lo scontrino."},
        {"it": "la cassa", "en": "checkout", "example": "C'è coda alla cassa."},
        {"it": "in offerta", "en": "on sale", "example": "Le mele sono in offerta oggi."},
        {"it": "fresco", "en": "fresh", "example": "Il pane è fresco di giornata."},
        {"it": "il pesce", "en": "fish", "example": "Compro il pesce il venerdì."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Vorrei un chilo _____ mele.", "answer": "di"},
        {"type": "fill", "sentence": "Le mele sono in _____ oggi.", "answer": "offerta"},
        {"type": "fill", "sentence": "Il pane è _____ di giornata.", "answer": "fresco"}
    ],
    "scenario": {
        "title": "Morning market in Catania",
        "setup": "You're at a vibrant Sicilian fish market buying groceries.",
        "opening": "Buongiorno! Il pesce è freschissimo oggi. Che Le do?",
        "goal": "Buy groceries using quantities and partitivo"
    }
})

units.append({
    "unit": 14, "level": "A2", "theme": "Ristorante", "theme_en": "Restaurant",
    "grammar_point": "Condizionale di cortesia (vorrei, potrei, avrei)",
    "vocab": [
        {"it": "il menù", "en": "menu", "example": "Posso avere il menù?"},
        {"it": "il primo", "en": "first course", "example": "Come primo prendo la pasta."},
        {"it": "il secondo", "en": "second course", "example": "Di secondo vorrei il pesce."},
        {"it": "il contorno", "en": "side dish", "example": "Come contorno, insalata mista."},
        {"it": "il conto", "en": "bill", "example": "Il conto, per favore."},
        {"it": "prenotare", "en": "to book/reserve", "example": "Vorrei prenotare un tavolo."},
        {"it": "il tavolo", "en": "table", "example": "Un tavolo per due, per favore."},
        {"it": "consigliare", "en": "to recommend", "example": "Cosa mi consiglia?"},
        {"it": "il piatto del giorno", "en": "dish of the day", "example": "Qual è il piatto del giorno?"},
        {"it": "la mancia", "en": "tip", "example": "In Italia la mancia non è obbligatoria."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Vorrei _____ un tavolo.", "answer": "prenotare"},
        {"type": "fill", "sentence": "Il _____, per favore.", "answer": "conto"},
        {"type": "fill", "sentence": "Cosa mi _____?", "answer": "consiglia"}
    ],
    "scenario": {
        "title": "Fine dining in Amalfi",
        "setup": "You're at a seaside restaurant for a special dinner.",
        "opening": "Buonasera. Ha prenotato?",
        "goal": "Reserve a table, order courses, and ask for the bill"
    }
})

units.append({
    "unit": 15, "level": "A2", "theme": "Salute", "theme_en": "Health",
    "grammar_point": "Mi fa male / Ho mal di + stare",
    "vocab": [
        {"it": "la testa", "en": "head", "example": "Ho mal di testa."},
        {"it": "la febbre", "en": "fever", "example": "Ho la febbre alta."},
        {"it": "il raffreddore", "en": "cold", "example": "Ho preso un raffreddore."},
        {"it": "la medicina", "en": "medicine", "example": "Devo prendere la medicina."},
        {"it": "il dottore", "en": "doctor", "example": "Devo andare dal dottore."},
        {"it": "stare male", "en": "to feel sick", "example": "Oggi sto male."},
        {"it": "la ricetta", "en": "prescription", "example": "Il dottore mi ha dato la ricetta."},
        {"it": "riposarsi", "en": "to rest", "example": "Devi riposarti un po'."},
        {"it": "la tosse", "en": "cough", "example": "Ho la tosse da tre giorni."},
        {"it": "guarire", "en": "to recover/heal", "example": "Spero di guarire presto."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Ho _____ di testa.", "answer": "mal"},
        {"type": "fill", "sentence": "Devo andare dal _____.", "answer": "dottore"},
        {"type": "fill", "sentence": "Spero di _____ presto.", "answer": "guarire"}
    ],
    "scenario": {
        "title": "At the pharmacy in Siena",
        "setup": "You're feeling unwell and go to the pharmacy for help.",
        "opening": "Buongiorno, come posso aiutarla?",
        "goal": "Describe symptoms and ask for medicine"
    }
})

units.append({
    "unit": 16, "level": "A2", "theme": "Animali", "theme_en": "Animals",
    "grammar_point": "Avere + piace vs piacere plurale",
    "vocab": [
        {"it": "il cane", "en": "dog", "example": "Ho un cane che si chiama Biscotto."},
        {"it": "il gatto", "en": "cat", "example": "Il gatto dorme tutto il giorno."},
        {"it": "l'uccello", "en": "bird", "example": "Gli uccelli cantano la mattina."},
        {"it": "il cavallo", "en": "horse", "example": "Mi piace andare a cavallo."},
        {"it": "il pesce", "en": "fish", "example": "Ho due pesci nell'acquario."},
        {"it": "la mucca", "en": "cow", "example": "Le mucche sono nel campo."},
        {"it": "la pecora", "en": "sheep", "example": "In Sardegna ci sono tante pecore."},
        {"it": "il lupo", "en": "wolf", "example": "Il lupo è il simbolo di Roma."},
        {"it": "la tartaruga", "en": "turtle", "example": "La tartaruga è lenta."},
        {"it": "nutrire", "en": "to feed", "example": "Devo nutrire il cane."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Ho un _____ che si chiama Biscotto.", "answer": "cane"},
        {"type": "fill", "sentence": "Mi piace andare a _____.", "answer": "cavallo"},
        {"type": "fill", "sentence": "Il lupo è il _____ di Roma.", "answer": "simbolo"}
    ],
    "scenario": {
        "title": "At the vet in Perugia",
        "setup": "You bring your pet to the veterinarian.",
        "opening": "Buongiorno! Che animale ha portato oggi?",
        "goal": "Describe your pet and its behavior"
    }
})

units.append({
    "unit": 17, "level": "A2", "theme": "Emozioni", "theme_en": "Emotions",
    "grammar_point": "Essere + aggettivo di emozione / sentirsi",
    "vocab": [
        {"it": "felice", "en": "happy", "example": "Sono molto felice oggi."},
        {"it": "triste", "en": "sad", "example": "Perché sei triste?"},
        {"it": "arrabbiato", "en": "angry", "example": "Non essere arrabbiato con me."},
        {"it": "stanco", "en": "tired", "example": "Sono stanco morto."},
        {"it": "preoccupato", "en": "worried", "example": "Sono preoccupato per l'esame."},
        {"it": "emozionato", "en": "excited", "example": "Sono emozionato per il viaggio."},
        {"it": "annoiato", "en": "bored", "example": "Mi sento annoiato."},
        {"it": "sorpreso", "en": "surprised", "example": "Sono rimasto sorpreso."},
        {"it": "sentirsi", "en": "to feel", "example": "Come ti senti oggi?"},
        {"it": "avere paura", "en": "to be afraid", "example": "Ho paura del buio."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Sono molto _____ oggi.", "answer": "felice"},
        {"type": "fill", "sentence": "Come ti _____ oggi?", "answer": "senti"},
        {"type": "fill", "sentence": "Ho _____ del buio.", "answer": "paura"}
    ],
    "scenario": {
        "title": "Chatting with a friend in Genoa",
        "setup": "Your friend seems upset and you want to help.",
        "opening": "Ehi, tutto bene? Hai una faccia strana.",
        "goal": "Express and ask about emotions"
    }
})

units.append({
    "unit": 18, "level": "A2", "theme": "Corpo", "theme_en": "Body",
    "grammar_point": "Articolo determinativo con parti del corpo",
    "vocab": [
        {"it": "la mano", "en": "hand", "example": "Mi lavo le mani."},
        {"it": "il braccio", "en": "arm", "example": "Mi fa male il braccio."},
        {"it": "la gamba", "en": "leg", "example": "Ho le gambe stanche."},
        {"it": "il piede", "en": "foot", "example": "Ho i piedi freddi."},
        {"it": "gli occhi", "en": "eyes", "example": "Ha gli occhi verdi."},
        {"it": "la bocca", "en": "mouth", "example": "Apri la bocca."},
        {"it": "il naso", "en": "nose", "example": "Ho il naso chiuso."},
        {"it": "le orecchie", "en": "ears", "example": "Mi fanno male le orecchie."},
        {"it": "la schiena", "en": "back", "example": "Ho mal di schiena."},
        {"it": "il ginocchio", "en": "knee", "example": "Mi sono fatto male al ginocchio."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Mi lavo le _____.", "answer": "mani"},
        {"type": "fill", "sentence": "Ha gli _____ verdi.", "answer": "occhi"},
        {"type": "fill", "sentence": "Ho mal di _____.", "answer": "schiena"}
    ],
    "scenario": {
        "title": "At the gym in Padova",
        "setup": "You're working out and feel some pain. The trainer checks on you.",
        "opening": "Tutto bene? Ti vedo un po' in difficoltà.",
        "goal": "Name body parts and describe physical sensations"
    }
})

units.append({
    "unit": 19, "level": "A2", "theme": "Routine quotidiana", "theme_en": "Daily Routine",
    "grammar_point": "Verbi riflessivi al presente (svegliarsi, lavarsi, vestirsi)",
    "vocab": [
        {"it": "svegliarsi", "en": "to wake up", "example": "Mi sveglio alle sette."},
        {"it": "alzarsi", "en": "to get up", "example": "Mi alzo subito dopo la sveglia."},
        {"it": "fare colazione", "en": "to have breakfast", "example": "Faccio colazione al bar."},
        {"it": "lavarsi", "en": "to wash oneself", "example": "Mi lavo i denti dopo colazione."},
        {"it": "vestirsi", "en": "to get dressed", "example": "Mi vesto in fretta."},
        {"it": "pranzare", "en": "to have lunch", "example": "Pranzo all'una."},
        {"it": "cenare", "en": "to have dinner", "example": "Ceniamo alle otto."},
        {"it": "addormentarsi", "en": "to fall asleep", "example": "Mi addormento tardi."},
        {"it": "di solito", "en": "usually", "example": "Di solito mi sveglio presto."},
        {"it": "ogni giorno", "en": "every day", "example": "Ogni giorno faccio sport."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Mi _____ alle sette.", "answer": "sveglio"},
        {"type": "fill", "sentence": "Faccio _____ al bar.", "answer": "colazione"},
        {"type": "fill", "sentence": "Di _____ mi sveglio presto.", "answer": "solito"}
    ],
    "scenario": {
        "title": "Morning in a shared flat in Rome",
        "setup": "Your flatmate is curious about your morning routine.",
        "opening": "Ma a che ora ti svegli di solito? Io non ti vedo mai la mattina!",
        "goal": "Describe your daily routine with reflexive verbs"
    }
})

units.append({
    "unit": 20, "level": "A2", "theme": "A2 Review", "theme_en": "A2 Review",
    "grammar_point": "Revisione: essere/avere, riflessivi, piacere, c'è/ci sono",
    "vocab": [
        {"it": "ripassare", "en": "to review", "example": "Dobbiamo ripassare tutto."},
        {"it": "capire", "en": "to understand", "example": "Capisci l'italiano?"},
        {"it": "ripetere", "en": "to repeat", "example": "Può ripetere, per favore?"},
        {"it": "più o meno", "en": "more or less", "example": "Parlo italiano più o meno bene."},
        {"it": "abbastanza", "en": "enough/quite", "example": "Parlo abbastanza bene."},
        {"it": "migliorare", "en": "to improve", "example": "Voglio migliorare il mio italiano."},
        {"it": "sbagliare", "en": "to make a mistake", "example": "Non aver paura di sbagliare."},
        {"it": "provare", "en": "to try", "example": "Proviamo ancora una volta."},
        {"it": "bravo", "en": "good/clever", "example": "Sei molto bravo!"},
        {"it": "in bocca al lupo", "en": "good luck", "example": "In bocca al lupo per l'esame!"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Voglio _____ il mio italiano.", "answer": "migliorare"},
        {"type": "fill", "sentence": "Non aver paura di _____.", "answer": "sbagliare"},
        {"type": "fill", "sentence": "In bocca al _____ per l'esame!", "answer": "lupo"}
    ],
    "scenario": {
        "title": "Language exchange in a park in Bologna",
        "setup": "You meet a language partner and chat about your Italian journey.",
        "opening": "Allora, come va con l'italiano? Raccontami un po' di te!",
        "goal": "Use all A2 skills: introduce yourself, describe, order, ask directions"
    }
})

# ============ B1 UNITS (21-40) ============

units.append({
    "unit": 21, "level": "B1", "theme": "Passato prossimo", "theme_en": "Present Perfect",
    "grammar_point": "Passato prossimo con avere e essere",
    "vocab": [
        {"it": "ho mangiato", "en": "I ate/have eaten", "example": "Ho mangiato una pizza."},
        {"it": "sono andato", "en": "I went/have gone", "example": "Sono andato al cinema ieri."},
        {"it": "ho visto", "en": "I saw/have seen", "example": "Ho visto un bel film."},
        {"it": "sono partito", "en": "I left/departed", "example": "Sono partito stamattina."},
        {"it": "ho comprato", "en": "I bought", "example": "Ho comprato un regalo."},
        {"it": "sono tornato", "en": "I came back", "example": "Sono tornato a casa tardi."},
        {"it": "ho scritto", "en": "I wrote", "example": "Ho scritto un'email."},
        {"it": "sono rimasto", "en": "I stayed", "example": "Sono rimasto a casa."},
        {"it": "ho fatto", "en": "I did/made", "example": "Ho fatto i compiti."},
        {"it": "sono uscito", "en": "I went out", "example": "Sono uscito con gli amici."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Ieri _____ andato al cinema.", "answer": "sono"},
        {"type": "fill", "sentence": "Ho _____ una pizza.", "answer": "mangiato"},
        {"type": "fill", "sentence": "Sono _____ a casa.", "answer": "rimasto"}
    ],
    "scenario": {
        "title": "Monday morning in the office",
        "setup": "Your colleague asks about your weekend.",
        "opening": "Ciao! Com'è andato il fine settimana? Che hai fatto?",
        "goal": "Narrate past events using passato prossimo"
    }
})

units.append({
    "unit": 22, "level": "B1", "theme": "Imperfetto", "theme_en": "Imperfect Tense",
    "grammar_point": "Imperfetto: formazione e usi (abitudini, descrizioni)",
    "vocab": [
        {"it": "da bambino", "en": "as a child", "example": "Da bambino giocavo sempre fuori."},
        {"it": "andavo", "en": "I used to go", "example": "Andavo al mare ogni estate."},
        {"it": "era", "en": "it was", "example": "Era una giornata bellissima."},
        {"it": "faceva", "en": "it was (weather)", "example": "Faceva caldo quel giorno."},
        {"it": "c'era", "en": "there was", "example": "C'era un bel sole."},
        {"it": "mentre", "en": "while", "example": "Mentre mangiavo, è squillato il telefono."},
        {"it": "sempre", "en": "always", "example": "Studiavo sempre la sera."},
        {"it": "ogni", "en": "every", "example": "Ogni domenica pranzavamo dai nonni."},
        {"it": "vivevo", "en": "I used to live", "example": "Vivevo a Firenze."},
        {"it": "sembrava", "en": "it seemed", "example": "Sembrava un sogno."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Da bambino _____ sempre fuori.", "answer": "giocavo"},
        {"type": "fill", "sentence": "Ogni domenica _____ dai nonni.", "answer": "pranzavamo"},
        {"type": "fill", "sentence": "_____ una giornata bellissima.", "answer": "Era"}
    ],
    "scenario": {
        "title": "Reminiscing with grandparents in Tuscany",
        "setup": "Your Italian grandparents are telling stories about the old days.",
        "opening": "Sai, quando ero giovane, tutto era diverso...",
        "goal": "Describe past habits and situations using imperfetto"
    }
})

units.append({
    "unit": 23, "level": "B1", "theme": "Passato vs Imperfetto", "theme_en": "Past Tenses Contrast",
    "grammar_point": "Quando usare passato prossimo vs imperfetto",
    "vocab": [
        {"it": "improvvisamente", "en": "suddenly", "example": "Improvvisamente ha iniziato a piovere."},
        {"it": "nel frattempo", "en": "meanwhile", "example": "Nel frattempo, io aspettavo."},
        {"it": "a un certo punto", "en": "at a certain point", "example": "A un certo punto è arrivata la polizia."},
        {"it": "già", "en": "already", "example": "Avevo già finito quando è arrivato."},
        {"it": "stavo per", "en": "I was about to", "example": "Stavo per uscire quando hai chiamato."},
        {"it": "all'improvviso", "en": "all of a sudden", "example": "All'improvviso si è spenta la luce."},
        {"it": "di solito", "en": "usually", "example": "Di solito prendevo il treno."},
        {"it": "quella volta", "en": "that time", "example": "Quella volta sono andato in macchina."},
        {"it": "succedere", "en": "to happen", "example": "Cosa è successo?"},
        {"it": "raccontare", "en": "to tell/narrate", "example": "Ti racconto cosa è successo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Mentre _____ la TV, è squillato il telefono.", "answer": "guardavo"},
        {"type": "fill", "sentence": "Stavo per uscire quando hai _____.", "answer": "chiamato"},
        {"type": "fill", "sentence": "Cosa è _____?", "answer": "successo"}
    ],
    "scenario": {
        "title": "Witness at a fender bender in Milan",
        "setup": "You saw a minor car accident and a policeman asks what happened.",
        "opening": "Mi scusi, ha visto cosa è successo?",
        "goal": "Narrate past events combining passato prossimo and imperfetto"
    }
})

units.append({
    "unit": 24, "level": "B1", "theme": "Futuro", "theme_en": "Future Tense",
    "grammar_point": "Futuro semplice: regolari e irregolari",
    "vocab": [
        {"it": "andrò", "en": "I will go", "example": "Domani andrò al mare."},
        {"it": "farò", "en": "I will do/make", "example": "Farò una torta per la festa."},
        {"it": "sarà", "en": "it will be", "example": "Sarà una bella giornata."},
        {"it": "avrò", "en": "I will have", "example": "Avrò più tempo il mese prossimo."},
        {"it": "verrò", "en": "I will come", "example": "Verrò alla tua festa."},
        {"it": "potrò", "en": "I will be able to", "example": "Potrò aiutarti domani."},
        {"it": "dovrò", "en": "I will have to", "example": "Dovrò studiare di più."},
        {"it": "tra", "en": "in (time)", "example": "Tra due settimane vado in vacanza."},
        {"it": "il prossimo anno", "en": "next year", "example": "Il prossimo anno viaggerò di più."},
        {"it": "chissà", "en": "who knows", "example": "Chissà cosa succederà."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Domani _____ al mare.", "answer": "andrò"},
        {"type": "fill", "sentence": "_____ alla tua festa.", "answer": "Verrò"},
        {"type": "fill", "sentence": "Tra due settimane vado in _____.", "answer": "vacanza"}
    ],
    "scenario": {
        "title": "New Year's Eve in Rome",
        "setup": "Friends are discussing resolutions and plans for the new year.",
        "opening": "Allora, quali sono i tuoi propositi per l'anno nuovo?",
        "goal": "Discuss future plans and predictions using futuro semplice"
    }
})

units.append({
    "unit": 25, "level": "B1", "theme": "Viaggi", "theme_en": "Travel",
    "grammar_point": "Stare + gerundio / stare per + infinito",
    "vocab": [
        {"it": "il volo", "en": "flight", "example": "Il volo parte alle dieci."},
        {"it": "la valigia", "en": "suitcase", "example": "Devo fare la valigia."},
        {"it": "l'albergo", "en": "hotel", "example": "Ho prenotato un albergo in centro."},
        {"it": "la prenotazione", "en": "reservation", "example": "Ho una prenotazione a nome Rossi."},
        {"it": "il passaporto", "en": "passport", "example": "Non dimenticare il passaporto!"},
        {"it": "la cartina", "en": "map", "example": "Hai una cartina della città?"},
        {"it": "il check-in", "en": "check-in", "example": "Il check-in è alle tre."},
        {"it": "l'escursione", "en": "excursion", "example": "Facciamo un'escursione domani."},
        {"it": "il souvenir", "en": "souvenir", "example": "Ho comprato dei souvenir."},
        {"it": "all'estero", "en": "abroad", "example": "Quest'estate vado all'estero."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Devo fare la _____.", "answer": "valigia"},
        {"type": "fill", "sentence": "Non dimenticare il _____!", "answer": "passaporto"},
        {"type": "fill", "sentence": "Quest'estate vado all'_____.", "answer": "estero"}
    ],
    "scenario": {
        "title": "At the airport in Fiumicino",
        "setup": "You're checking in for a flight to Sardinia.",
        "opening": "Buongiorno. Il passaporto e la carta d'imbarco, prego.",
        "goal": "Handle travel situations: check-in, directions, reservations"
    }
})

units.append({
    "unit": 26, "level": "B1", "theme": "Shopping/Comparativi", "theme_en": "Shopping and Comparatives",
    "grammar_point": "Comparativi (più...di, meno...di, tanto...quanto)",
    "vocab": [
        {"it": "più caro", "en": "more expensive", "example": "Questo è più caro di quello."},
        {"it": "meno costoso", "en": "less expensive", "example": "La camicia è meno costosa."},
        {"it": "migliore", "en": "better", "example": "Questa qualità è migliore."},
        {"it": "peggiore", "en": "worse", "example": "Il servizio qui è peggiore."},
        {"it": "il più bello", "en": "the most beautiful", "example": "È il vestito più bello."},
        {"it": "conveniente", "en": "affordable/good deal", "example": "Questo negozio è conveniente."},
        {"it": "la qualità", "en": "quality", "example": "La qualità è ottima."},
        {"it": "il marchio", "en": "brand", "example": "Che marchio preferisci?"},
        {"it": "il cambio", "en": "exchange/return", "example": "Posso fare il cambio?"},
        {"it": "provarsi", "en": "to try on (reflexive)", "example": "Mi provo questa giacca."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Questo è _____ caro di quello.", "answer": "più"},
        {"type": "fill", "sentence": "È il vestito più _____.", "answer": "bello"},
        {"type": "fill", "sentence": "Posso fare il _____?", "answer": "cambio"}
    ],
    "scenario": {
        "title": "Outlet shopping near Florence",
        "setup": "You're comparing products at a big outlet mall.",
        "opening": "Guarda, questo costa la metà! Ma secondo te è buono come l'altro?",
        "goal": "Compare products using comparatives and superlatives"
    }
})

units.append({
    "unit": 27, "level": "B1", "theme": "Lavoro", "theme_en": "Work",
    "grammar_point": "Dovere/potere/volere + infinito (modali)",
    "vocab": [
        {"it": "la riunione", "en": "meeting", "example": "Ho una riunione alle dieci."},
        {"it": "la scadenza", "en": "deadline", "example": "La scadenza è venerdì."},
        {"it": "il capo", "en": "boss", "example": "Il capo vuole il report domani."},
        {"it": "il progetto", "en": "project", "example": "Stiamo lavorando a un nuovo progetto."},
        {"it": "il curriculum", "en": "CV/resume", "example": "Ho mandato il mio curriculum."},
        {"it": "il colloquio", "en": "job interview", "example": "Ho un colloquio domani."},
        {"it": "assumere", "en": "to hire", "example": "L'azienda vuole assumere dieci persone."},
        {"it": "licenziare", "en": "to fire", "example": "Hanno licenziato tre colleghi."},
        {"it": "lo straordinario", "en": "overtime", "example": "Faccio spesso lo straordinario."},
        {"it": "fare carriera", "en": "to advance one's career", "example": "Vuole fare carriera in finanza."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Ho una _____ alle dieci.", "answer": "riunione"},
        {"type": "fill", "sentence": "La _____ è venerdì.", "answer": "scadenza"},
        {"type": "fill", "sentence": "Ho un _____ domani.", "answer": "colloquio"}
    ],
    "scenario": {
        "title": "Job interview in Milan",
        "setup": "You're at a job interview for a tech company.",
        "opening": "Buongiorno, si accomodi. Mi parli un po' di lei e della sua esperienza.",
        "goal": "Talk about work experience and professional goals using modal verbs"
    }
})

units.append({
    "unit": 28, "level": "B1", "theme": "Tecnologia", "theme_en": "Technology",
    "grammar_point": "Pronomi relativi (che, cui, il quale)",
    "vocab": [
        {"it": "il computer", "en": "computer", "example": "Il computer non funziona."},
        {"it": "lo smartphone", "en": "smartphone", "example": "Ho comprato uno smartphone nuovo."},
        {"it": "il sito web", "en": "website", "example": "Visita il nostro sito web."},
        {"it": "scaricare", "en": "to download", "example": "Devo scaricare un'app."},
        {"it": "il programma", "en": "software/program", "example": "Quale programma usi?"},
        {"it": "la password", "en": "password", "example": "Ho dimenticato la password."},
        {"it": "aggiornare", "en": "to update", "example": "Devi aggiornare il sistema."},
        {"it": "il Wi-Fi", "en": "Wi-Fi", "example": "Qual è la password del Wi-Fi?"},
        {"it": "caricare", "en": "to charge/upload", "example": "Devo caricare il telefono."},
        {"it": "funzionare", "en": "to work/function", "example": "L'app non funziona bene."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Il computer non _____.", "answer": "funziona"},
        {"type": "fill", "sentence": "Ho _____ la password.", "answer": "dimenticato"},
        {"type": "fill", "sentence": "Devo _____ il telefono.", "answer": "caricare"}
    ],
    "scenario": {
        "title": "Tech support at the office",
        "setup": "Your laptop crashed and you're calling IT support.",
        "opening": "Assistenza tecnica, buongiorno. Qual è il problema?",
        "goal": "Describe tech problems and follow instructions"
    }
})

units.append({
    "unit": 29, "level": "B1", "theme": "Relazioni", "theme_en": "Relationships",
    "grammar_point": "Pronomi combinati (me lo, te la, glielo)",
    "vocab": [
        {"it": "il ragazzo", "en": "boyfriend", "example": "Ti presento il mio ragazzo."},
        {"it": "la ragazza", "en": "girlfriend", "example": "La mia ragazza è di Napoli."},
        {"it": "fidanzarsi", "en": "to get engaged", "example": "Si sono fidanzati a Natale."},
        {"it": "sposarsi", "en": "to get married", "example": "Si sposano a giugno."},
        {"it": "litigare", "en": "to argue", "example": "Non litighiamo mai."},
        {"it": "andare d'accordo", "en": "to get along", "example": "Andiamo molto d'accordo."},
        {"it": "fidarsi", "en": "to trust", "example": "Mi fido di te."},
        {"it": "volersi bene", "en": "to love each other", "example": "Ci vogliamo molto bene."},
        {"it": "lasciare", "en": "to leave/break up", "example": "L'ha lasciata il mese scorso."},
        {"it": "il matrimonio", "en": "wedding/marriage", "example": "Il matrimonio è a settembre."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Si sono _____ a Natale.", "answer": "fidanzati"},
        {"type": "fill", "sentence": "Andiamo molto d'_____.", "answer": "accordo"},
        {"type": "fill", "sentence": "Mi _____ di te.", "answer": "fido"}
    ],
    "scenario": {
        "title": "Aperitivo gossip in Rome",
        "setup": "Friends are catching up over drinks and talking about relationships.",
        "opening": "Sai che Marco e Giulia si sono lasciati? Non ci credo!",
        "goal": "Discuss relationships and use combined pronouns"
    }
})

units.append({
    "unit": 30, "level": "B1", "theme": "Condizionale", "theme_en": "Conditional Mood",
    "grammar_point": "Condizionale presente (vorrei, farei, andrei)",
    "vocab": [
        {"it": "vorrei", "en": "I would like", "example": "Vorrei viaggiare di più."},
        {"it": "potrei", "en": "I could", "example": "Potrei aiutarti domani."},
        {"it": "dovrei", "en": "I should", "example": "Dovrei studiare di più."},
        {"it": "farei", "en": "I would do", "example": "Al posto tuo, farei diversamente."},
        {"it": "andrei", "en": "I would go", "example": "Andrei volentieri in Giappone."},
        {"it": "sarebbe", "en": "it would be", "example": "Sarebbe bello vivere al mare."},
        {"it": "al posto tuo", "en": "in your place", "example": "Al posto tuo, accetterei."},
        {"it": "volentieri", "en": "gladly", "example": "Verrei volentieri alla cena."},
        {"it": "se potessi", "en": "if I could", "example": "Se potessi, vivrei in Italia."},
        {"it": "magari", "en": "maybe/I wish", "example": "Magari potessimo andare!"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ viaggiare di più.", "answer": "Vorrei"},
        {"type": "fill", "sentence": "Al posto tuo, _____ diversamente.", "answer": "farei"},
        {"type": "fill", "sentence": "_____ bello vivere al mare.", "answer": "Sarebbe"}
    ],
    "scenario": {
        "title": "Dream vacation planning",
        "setup": "You and a friend are daydreaming about ideal vacations.",
        "opening": "Se avessi un mese libero, dove andresti?",
        "goal": "Express wishes and hypothetical situations with condizionale"
    }
})

units.append({
    "unit": 31, "level": "B1", "theme": "Pronomi diretti", "theme_en": "Direct Object Pronouns",
    "grammar_point": "Pronomi diretti (lo, la, li, le) + posizione",
    "vocab": [
        {"it": "lo/la", "en": "him/her/it", "example": "Lo conosco bene."},
        {"it": "li/le", "en": "them (m/f)", "example": "Li vedo ogni giorno."},
        {"it": "mi", "en": "me", "example": "Mi chiami stasera?"},
        {"it": "ti", "en": "you", "example": "Ti aspetto alle otto."},
        {"it": "ci", "en": "us", "example": "Ci invitano alla festa."},
        {"it": "conoscere", "en": "to know (person)", "example": "La conosci quella ragazza?"},
        {"it": "chiamare", "en": "to call", "example": "Ti chiamo domani."},
        {"it": "aspettare", "en": "to wait for", "example": "Ti aspetto fuori."},
        {"it": "invitare", "en": "to invite", "example": "Li ha invitati alla cena."},
        {"it": "accompagnare", "en": "to accompany", "example": "Ti accompagno alla stazione."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ conosco bene. (lui)", "answer": "Lo"},
        {"type": "fill", "sentence": "_____ aspetto alle otto.", "answer": "Ti"},
        {"type": "fill", "sentence": "_____ invitano alla festa. (noi)", "answer": "Ci"}
    ],
    "scenario": {
        "title": "Planning a surprise party",
        "setup": "You're secretly organizing a birthday party with co-conspirators.",
        "opening": "Allora, hai chiamato Marco? Lo hai invitato?",
        "goal": "Use direct object pronouns to talk about people and things"
    }
})

units.append({
    "unit": 32, "level": "B1", "theme": "Pronomi indiretti", "theme_en": "Indirect Object Pronouns",
    "grammar_point": "Pronomi indiretti (mi, ti, gli, le, ci, vi, gli) + piacere",
    "vocab": [
        {"it": "gli/le", "en": "to him/to her", "example": "Gli ho detto la verità."},
        {"it": "mi piace", "en": "I like (lit: it pleases me)", "example": "Mi piace molto questo film."},
        {"it": "ti serve", "en": "you need", "example": "Ti serve qualcosa?"},
        {"it": "ci manca", "en": "we miss", "example": "Ci manca molto l'Italia."},
        {"it": "dare", "en": "to give", "example": "Gli do il libro domani."},
        {"it": "dire", "en": "to say/tell", "example": "Le dico sempre la verità."},
        {"it": "mandare", "en": "to send", "example": "Ti mando un messaggio."},
        {"it": "regalare", "en": "to give as gift", "example": "Cosa gli regaliamo?"},
        {"it": "chiedere", "en": "to ask", "example": "Gli chiedo un consiglio."},
        {"it": "rispondere", "en": "to answer", "example": "Non mi ha risposto."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ ho detto la verità. (a lui)", "answer": "Gli"},
        {"type": "fill", "sentence": "Cosa _____ regaliamo? (a lei)", "answer": "le"},
        {"type": "fill", "sentence": "Non _____ ha risposto. (a me)", "answer": "mi"}
    ],
    "scenario": {
        "title": "Choosing a gift at a shop in Florence",
        "setup": "You need to buy birthday gifts for several friends.",
        "opening": "È il compleanno di Lucia sabato. Cosa le regaliamo?",
        "goal": "Use indirect pronouns to discuss giving/telling/sending things to people"
    }
})

units.append({
    "unit": 33, "level": "B1", "theme": "Imperativo", "theme_en": "Imperative",
    "grammar_point": "Imperativo (tu, noi, voi) + imperativo negativo",
    "vocab": [
        {"it": "ascolta!", "en": "listen!", "example": "Ascolta, ti devo dire una cosa."},
        {"it": "guarda!", "en": "look!", "example": "Guarda che bel tramonto!"},
        {"it": "dimmi", "en": "tell me", "example": "Dimmi la verità!"},
        {"it": "vieni!", "en": "come!", "example": "Vieni qui un momento!"},
        {"it": "non preoccuparti", "en": "don't worry", "example": "Non preoccuparti, va tutto bene."},
        {"it": "dai!", "en": "come on!", "example": "Dai, andiamo!"},
        {"it": "aspetta!", "en": "wait!", "example": "Aspetta un attimo!"},
        {"it": "smettila!", "en": "stop it!", "example": "Smettila di lamentarti!"},
        {"it": "stai attento!", "en": "be careful!", "example": "Stai attento alla macchina!"},
        {"it": "facciamo!", "en": "let's do it!", "example": "Facciamo un gioco!"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ la verità!", "answer": "Dimmi"},
        {"type": "fill", "sentence": "Non _____, va tutto bene.", "answer": "preoccuparti"},
        {"type": "fill", "sentence": "_____ attento alla macchina!", "answer": "Stai"}
    ],
    "scenario": {
        "title": "Cooking class in Bologna",
        "setup": "An Italian nonna is teaching you her secret pasta recipe.",
        "opening": "Allora, prima cosa: lavati le mani! Poi prendi la farina.",
        "goal": "Follow and give instructions using imperativo"
    }
})

units.append({
    "unit": 34, "level": "B1", "theme": "Riflessivi", "theme_en": "Reflexive Verbs",
    "grammar_point": "Verbi riflessivi al passato prossimo (accordo participio)",
    "vocab": [
        {"it": "divertirsi", "en": "to have fun", "example": "Mi sono divertito molto."},
        {"it": "arrabbiarsi", "en": "to get angry", "example": "Si è arrabbiata con me."},
        {"it": "preoccuparsi", "en": "to worry", "example": "Non preoccuparti per niente."},
        {"it": "innamorarsi", "en": "to fall in love", "example": "Si sono innamorati a Venezia."},
        {"it": "trasferirsi", "en": "to move (relocate)", "example": "Mi sono trasferito a Roma."},
        {"it": "annoiarsi", "en": "to get bored", "example": "Mi sono annoiato alla festa."},
        {"it": "lamentarsi", "en": "to complain", "example": "Si lamenta sempre del lavoro."},
        {"it": "rilassarsi", "en": "to relax", "example": "Mi rilasso leggendo un libro."},
        {"it": "rendersi conto", "en": "to realize", "example": "Mi sono reso conto dell'errore."},
        {"it": "abituarsi", "en": "to get used to", "example": "Mi sono abituato al freddo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Mi sono _____ molto. (divertire)", "answer": "divertito"},
        {"type": "fill", "sentence": "Si sono _____ a Venezia. (innamorare)", "answer": "innamorati"},
        {"type": "fill", "sentence": "Mi sono reso _____ dell'errore.", "answer": "conto"}
    ],
    "scenario": {
        "title": "Catching up after a holiday",
        "setup": "You just came back from vacation and your friend wants details.",
        "opening": "Allora, com'è andata la vacanza? Ti sei divertito?",
        "goal": "Use reflexive verbs in passato prossimo with correct agreement"
    }
})

units.append({
    "unit": 35, "level": "B1", "theme": "Tempo atmosferico", "theme_en": "Weather",
    "grammar_point": "Verbi impersonali (piove, nevica, fa caldo/freddo)",
    "vocab": [
        {"it": "piove", "en": "it's raining", "example": "Piove sempre a novembre."},
        {"it": "nevica", "en": "it's snowing", "example": "Nevica in montagna."},
        {"it": "fa caldo", "en": "it's hot", "example": "D'estate fa molto caldo."},
        {"it": "fa freddo", "en": "it's cold", "example": "Oggi fa freddo, metti la giacca."},
        {"it": "il temporale", "en": "thunderstorm", "example": "C'è un temporale in arrivo."},
        {"it": "il sole", "en": "sun", "example": "C'è un bel sole oggi."},
        {"it": "la nuvola", "en": "cloud", "example": "Il cielo è pieno di nuvole."},
        {"it": "il vento", "en": "wind", "example": "Tira molto vento."},
        {"it": "le previsioni", "en": "forecast", "example": "Le previsioni dicono pioggia."},
        {"it": "l'ombrello", "en": "umbrella", "example": "Porta l'ombrello, per sicurezza."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "D'estate fa molto _____.", "answer": "caldo"},
        {"type": "fill", "sentence": "_____ sempre a novembre.", "answer": "Piove"},
        {"type": "fill", "sentence": "Porta l'_____, per sicurezza.", "answer": "ombrello"}
    ],
    "scenario": {
        "title": "Planning a hike in the Dolomites",
        "setup": "You're checking the weather before a mountain hike.",
        "opening": "Hai visto le previsioni? Sembra che domani ci sia bel tempo.",
        "goal": "Discuss weather conditions and make plans accordingly"
    }
})

units.append({
    "unit": 36, "level": "B1", "theme": "Dal dottore", "theme_en": "At the Doctor's",
    "grammar_point": "Dovere + passato (ho dovuto, sono dovuto)",
    "vocab": [
        {"it": "il sintomo", "en": "symptom", "example": "Quali sono i sintomi?"},
        {"it": "la visita", "en": "medical visit", "example": "Ho una visita dal dottore."},
        {"it": "la pastiglia", "en": "pill/tablet", "example": "Prenda una pastiglia al giorno."},
        {"it": "l'allergia", "en": "allergy", "example": "Ho un'allergia al polline."},
        {"it": "il pronto soccorso", "en": "emergency room", "example": "Devo andare al pronto soccorso."},
        {"it": "la pressione", "en": "blood pressure", "example": "Mi misuro la pressione."},
        {"it": "il dolore", "en": "pain", "example": "Ho un forte dolore al petto."},
        {"it": "respirare", "en": "to breathe", "example": "Respiri profondamente."},
        {"it": "l'analisi", "en": "test/analysis", "example": "Devo fare le analisi del sangue."},
        {"it": "la cura", "en": "treatment/cure", "example": "Qual è la cura migliore?"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Quali sono i _____?", "answer": "sintomi"},
        {"type": "fill", "sentence": "Prenda una _____ al giorno.", "answer": "pastiglia"},
        {"type": "fill", "sentence": "Ho un forte _____ al petto.", "answer": "dolore"}
    ],
    "scenario": {
        "title": "Doctor's appointment in Florence",
        "setup": "You visit the doctor because you've been feeling unwell for a week.",
        "opening": "Buongiorno, mi dica. Cosa la porta qui oggi?",
        "goal": "Describe symptoms in detail and understand medical advice"
    }
})

units.append({
    "unit": 37, "level": "B1", "theme": "Media/Notizie", "theme_en": "Media and News",
    "grammar_point": "Si impersonale e si passivante",
    "vocab": [
        {"it": "il telegiornale", "en": "TV news", "example": "Guardo il telegiornale ogni sera."},
        {"it": "il giornale", "en": "newspaper", "example": "Leggo il giornale al bar."},
        {"it": "l'articolo", "en": "article", "example": "Ho letto un articolo interessante."},
        {"it": "la notizia", "en": "news item", "example": "Hai sentito la notizia?"},
        {"it": "in diretta", "en": "live (broadcast)", "example": "Lo trasmettono in diretta."},
        {"it": "i social media", "en": "social media", "example": "Passo troppo tempo sui social."},
        {"it": "condividere", "en": "to share", "example": "Ha condiviso la notizia online."},
        {"it": "secondo me", "en": "in my opinion", "example": "Secondo me non è vero."},
        {"it": "la fonte", "en": "source", "example": "Qual è la fonte di questa notizia?"},
        {"it": "la fake news", "en": "fake news", "example": "Bisogna stare attenti alle fake news."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Guardo il _____ ogni sera.", "answer": "telegiornale"},
        {"type": "fill", "sentence": "_____ me non è vero.", "answer": "Secondo"},
        {"type": "fill", "sentence": "Qual è la _____ di questa notizia?", "answer": "fonte"}
    ],
    "scenario": {
        "title": "Discussing news at a bar in Turin",
        "setup": "You're reading the paper and a regular at the bar starts debating the headlines.",
        "opening": "Hai visto cosa è successo? Non ci si può credere!",
        "goal": "Discuss news stories and express opinions using si impersonale"
    }
})

units.append({
    "unit": 38, "level": "B1", "theme": "Opinioni", "theme_en": "Opinions",
    "grammar_point": "Espressioni per dare opinioni + connettivi (però, quindi, perché)",
    "vocab": [
        {"it": "penso che", "en": "I think that", "example": "Penso che sia una buona idea."},
        {"it": "credo che", "en": "I believe that", "example": "Credo che abbia ragione."},
        {"it": "sono d'accordo", "en": "I agree", "example": "Sono d'accordo con te."},
        {"it": "non sono d'accordo", "en": "I disagree", "example": "Non sono d'accordo."},
        {"it": "secondo me", "en": "in my opinion", "example": "Secondo me, è troppo caro."},
        {"it": "però", "en": "however", "example": "È bello, però costa troppo."},
        {"it": "quindi", "en": "therefore", "example": "Piove, quindi restiamo a casa."},
        {"it": "infatti", "en": "in fact", "example": "Infatti, avevi ragione tu."},
        {"it": "comunque", "en": "anyway", "example": "Comunque, cambiamo argomento."},
        {"it": "avere ragione", "en": "to be right", "example": "Hai ragione, scusa."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Sono d'_____ con te.", "answer": "accordo"},
        {"type": "fill", "sentence": "È bello, _____ costa troppo.", "answer": "però"},
        {"type": "fill", "sentence": "Hai _____, scusa.", "answer": "ragione"}
    ],
    "scenario": {
        "title": "Debate night at a friend's house",
        "setup": "Friends are debating whether it's better to live in a city or the countryside.",
        "opening": "Secondo me, vivere in campagna è meglio. Tu che ne pensi?",
        "goal": "Express and defend opinions using connectives"
    }
})

units.append({
    "unit": 39, "level": "B1", "theme": "Fare piani", "theme_en": "Making Plans",
    "grammar_point": "Futuro + espressioni di tempo + proporre",
    "vocab": [
        {"it": "organizziamo", "en": "let's organize", "example": "Organizziamo una cena?"},
        {"it": "che ne dici", "en": "what do you say", "example": "Che ne dici di uscire stasera?"},
        {"it": "ti va di", "en": "do you feel like", "example": "Ti va di andare al cinema?"},
        {"it": "mi farebbe piacere", "en": "I'd be happy to", "example": "Mi farebbe piacere vederti."},
        {"it": "purtroppo", "en": "unfortunately", "example": "Purtroppo non posso venire."},
        {"it": "rimandare", "en": "to postpone", "example": "Dobbiamo rimandare a sabato."},
        {"it": "confermare", "en": "to confirm", "example": "Confermo per sabato sera."},
        {"it": "l'appuntamento", "en": "appointment/date", "example": "Ho un appuntamento alle cinque."},
        {"it": "libero", "en": "free/available", "example": "Sei libero domani sera?"},
        {"it": "impegnato", "en": "busy", "example": "Sono impegnato tutta la settimana."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Che ne _____ di uscire stasera?", "answer": "dici"},
        {"type": "fill", "sentence": "Ti _____ di andare al cinema?", "answer": "va"},
        {"type": "fill", "sentence": "_____ non posso venire.", "answer": "Purtroppo"}
    ],
    "scenario": {
        "title": "Group chat comes to life",
        "setup": "You're texting friends to organize a weekend trip to the coast.",
        "opening": "Ragazzi, che ne dite di andare al mare questo weekend? Io sono libero!",
        "goal": "Propose plans, accept/decline invitations, reschedule"
    }
})

units.append({
    "unit": 40, "level": "B1", "theme": "B1 Review", "theme_en": "B1 Review",
    "grammar_point": "Revisione: passato prossimo/imperfetto, condizionale, pronomi, imperativo",
    "vocab": [
        {"it": "raccontare", "en": "to tell/narrate", "example": "Raccontami del tuo viaggio."},
        {"it": "esprimere", "en": "to express", "example": "È importante esprimere le emozioni."},
        {"it": "discutere", "en": "to discuss", "example": "Abbiamo discusso a lungo."},
        {"it": "convincere", "en": "to convince", "example": "Non mi hai convinto."},
        {"it": "proporre", "en": "to propose/suggest", "example": "Ti propongo un'alternativa."},
        {"it": "promettere", "en": "to promise", "example": "Ti prometto che verrò."},
        {"it": "ammettere", "en": "to admit", "example": "Devo ammettere che avevi ragione."},
        {"it": "insomma", "en": "in short/well", "example": "Insomma, è stata una bella giornata."},
        {"it": "in conclusione", "en": "in conclusion", "example": "In conclusione, devo ringraziarvi."},
        {"it": "fare progressi", "en": "to make progress", "example": "Stai facendo molti progressi!"}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ del tuo viaggio.", "answer": "Raccontami"},
        {"type": "fill", "sentence": "Devo _____ che avevi ragione.", "answer": "ammettere"},
        {"type": "fill", "sentence": "Stai facendo molti _____!", "answer": "progressi"}
    ],
    "scenario": {
        "title": "End of a language course in Perugia",
        "setup": "It's the last day of your Italian course and the teacher asks you to reflect on your experience.",
        "opening": "Allora, siamo alla fine del corso! Raccontatemi: cos'avete imparato? Cosa vi è piaciuto di più?",
        "goal": "Use all B1 skills: narrate past events, express opinions, discuss plans"
    }
})

# ============ B2 UNITS (41-60) ============

units.append({
    "unit": 41, "level": "B2", "theme": "Congiuntivo presente", "theme_en": "Present Subjunctive",
    "grammar_point": "Congiuntivo presente dopo espressioni di opinione/desiderio",
    "vocab": [
        {"it": "penso che sia", "en": "I think it is", "example": "Penso che sia una buona idea."},
        {"it": "voglio che tu faccia", "en": "I want you to do", "example": "Voglio che tu faccia attenzione."},
        {"it": "bisogna che", "en": "it's necessary that", "example": "Bisogna che partiamo presto."},
        {"it": "sembra che", "en": "it seems that", "example": "Sembra che piova."},
        {"it": "nonostante", "en": "despite", "example": "Nonostante sia stanco, esco."},
        {"it": "a meno che", "en": "unless", "example": "Vengo a meno che non piova."},
        {"it": "prima che", "en": "before", "example": "Parla prima che sia troppo tardi."},
        {"it": "affinché", "en": "so that", "example": "Studio affinché io possa capire."},
        {"it": "sebbene", "en": "although", "example": "Sebbene sia difficile, ci provo."},
        {"it": "purché", "en": "provided that", "example": "Vengo purché tu paghi la cena."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Penso che _____ una buona idea.", "answer": "sia"},
        {"type": "fill", "sentence": "Nonostante _____ stanco, esco.", "answer": "sia"},
        {"type": "fill", "sentence": "Vengo a meno che non _____.", "answer": "piova"}
    ],
    "scenario": {
        "title": "Debating at a dinner party in Rome",
        "setup": "A lively discussion about Italian politics erupts at a dinner party.",
        "opening": "Penso che il governo debba fare di più per i giovani. Tu che ne pensi?",
        "goal": "Express opinions and doubts using congiuntivo presente"
    }
})

units.append({
    "unit": 42, "level": "B2", "theme": "Congiuntivo passato", "theme_en": "Past Subjunctive",
    "grammar_point": "Congiuntivo passato (che io abbia fatto, che sia andato)",
    "vocab": [
        {"it": "credo che abbia", "en": "I believe he/she has", "example": "Credo che abbia già finito."},
        {"it": "penso che sia stato", "en": "I think it was", "example": "Penso che sia stato un errore."},
        {"it": "è possibile che", "en": "it's possible that", "example": "È possibile che abbia ragione."},
        {"it": "dubitare", "en": "to doubt", "example": "Dubito che abbia capito."},
        {"it": "sperare", "en": "to hope", "example": "Spero che tutto sia andato bene."},
        {"it": "temere", "en": "to fear", "example": "Temo che abbia perso il treno."},
        {"it": "è probabile che", "en": "it's likely that", "example": "È probabile che siano partiti."},
        {"it": "non credo che", "en": "I don't think that", "example": "Non credo che l'abbia fatto apposta."},
        {"it": "benché", "en": "although", "example": "Benché abbia studiato, non ha passato l'esame."},
        {"it": "apposta", "en": "on purpose", "example": "Non l'ho fatto apposta."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Credo che _____ già finito.", "answer": "abbia"},
        {"type": "fill", "sentence": "Spero che tutto _____ andato bene.", "answer": "sia"},
        {"type": "fill", "sentence": "Dubito che _____ capito.", "answer": "abbia"}
    ],
    "scenario": {
        "title": "Investigating a mystery in Venice",
        "setup": "A friend's bag went missing at a hotel and you're speculating what happened.",
        "opening": "È possibile che qualcuno l'abbia presa per sbaglio. Tu che pensi sia successo?",
        "goal": "Speculate about past events using congiuntivo passato"
    }
})

units.append({
    "unit": 43, "level": "B2", "theme": "Condizionale passato", "theme_en": "Past Conditional",
    "grammar_point": "Condizionale passato (avrei fatto, sarei andato)",
    "vocab": [
        {"it": "avrei dovuto", "en": "I should have", "example": "Avrei dovuto studiare di più."},
        {"it": "sarei andato", "en": "I would have gone", "example": "Sarei andato, ma ero malato."},
        {"it": "avrei potuto", "en": "I could have", "example": "Avrei potuto aiutarti."},
        {"it": "avrei voluto", "en": "I would have wanted", "example": "Avrei voluto viaggiare di più."},
        {"it": "avrei preferito", "en": "I would have preferred", "example": "Avrei preferito restare a casa."},
        {"it": "sarebbe stato", "en": "it would have been", "example": "Sarebbe stato meglio aspettare."},
        {"it": "al tuo posto", "en": "in your place", "example": "Al tuo posto avrei accettato."},
        {"it": "pentirsi", "en": "to regret", "example": "Mi sono pentito di non essere andato."},
        {"it": "rimpianto", "en": "regret", "example": "Non ho rimpianti."},
        {"it": "con il senno di poi", "en": "in hindsight", "example": "Con il senno di poi, avrei fatto diversamente."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ dovuto studiare di più.", "answer": "Avrei"},
        {"type": "fill", "sentence": "Sarebbe _____ meglio aspettare.", "answer": "stato"},
        {"type": "fill", "sentence": "Al tuo posto _____ accettato.", "answer": "avrei"}
    ],
    "scenario": {
        "title": "Reflecting on life choices at a reunion",
        "setup": "At a school reunion, old friends discuss paths not taken.",
        "opening": "Sai, a volte penso che avrei dovuto fare medicina invece di legge. E tu?",
        "goal": "Express regrets and hypothetical past actions with condizionale passato"
    }
})

units.append({
    "unit": 44, "level": "B2", "theme": "Periodo ipotetico", "theme_en": "Conditional Sentences",
    "grammar_point": "Periodo ipotetico: I, II e III tipo",
    "vocab": [
        {"it": "se fossi", "en": "if I were", "example": "Se fossi ricco, viaggerei."},
        {"it": "se avessi saputo", "en": "if I had known", "example": "Se avessi saputo, sarei venuto."},
        {"it": "qualora", "en": "in case", "example": "Qualora piovesse, restiamo dentro."},
        {"it": "nel caso in cui", "en": "in the event that", "example": "Nel caso in cui arrivi tardi, chiamami."},
        {"it": "immaginare", "en": "to imagine", "example": "Immagina di vincere la lotteria."},
        {"it": "supporre", "en": "to suppose", "example": "Supponiamo che tu abbia ragione."},
        {"it": "come se", "en": "as if", "example": "Parla come se sapesse tutto."},
        {"it": "altrimenti", "en": "otherwise", "example": "Sbrigati, altrimenti facciamo tardi."},
        {"it": "a condizione che", "en": "on the condition that", "example": "Accetto a condizione che tu venga."},
        {"it": "ipotesi", "en": "hypothesis", "example": "È solo un'ipotesi."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Se _____ ricco, viaggerei.", "answer": "fossi"},
        {"type": "fill", "sentence": "Se avessi saputo, _____ venuto.", "answer": "sarei"},
        {"type": "fill", "sentence": "Parla come se _____ tutto.", "answer": "sapesse"}
    ],
    "scenario": {
        "title": "What-if game at an aperitivo",
        "setup": "Friends are playing 'what would you do if...' over Aperol Spritz.",
        "opening": "Gioco! Se potessi vivere in qualsiasi epoca, quale sceglieresti?",
        "goal": "Construct all three types of conditional sentences"
    }
})

units.append({
    "unit": 45, "level": "B2", "theme": "Passivo", "theme_en": "Passive Voice",
    "grammar_point": "Forma passiva (essere + participio, venire + participio)",
    "vocab": [
        {"it": "è stato costruito", "en": "was built", "example": "Il Colosseo è stato costruito nel 72 d.C."},
        {"it": "viene prodotto", "en": "is produced", "example": "Il Parmigiano viene prodotto in Emilia."},
        {"it": "è stato scoperto", "en": "was discovered", "example": "L'America è stata scoperta nel 1492."},
        {"it": "viene considerato", "en": "is considered", "example": "Viene considerato un capolavoro."},
        {"it": "è stato scritto", "en": "was written", "example": "Il libro è stato scritto nel '900."},
        {"it": "viene usato", "en": "is used", "example": "Questo metodo viene usato spesso."},
        {"it": "fu fondato", "en": "was founded", "example": "Roma fu fondata nel 753 a.C."},
        {"it": "viene chiamato", "en": "is called", "example": "Viene chiamato il Belpaese."},
        {"it": "è stato restaurato", "en": "was restored", "example": "L'affresco è stato restaurato."},
        {"it": "si dice", "en": "it is said", "example": "Si dice che sia il migliore."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Il Colosseo è _____ costruito nel 72 d.C.", "answer": "stato"},
        {"type": "fill", "sentence": "Il Parmigiano _____ prodotto in Emilia.", "answer": "viene"},
        {"type": "fill", "sentence": "Roma _____ fondata nel 753 a.C.", "answer": "fu"}
    ],
    "scenario": {
        "title": "Guided tour of Pompeii",
        "setup": "You're visiting Pompeii with a guide who explains the ruins.",
        "opening": "Questa città fu sepolta dall'eruzione del Vesuvio nel 79 d.C. Guardate qui...",
        "goal": "Understand and use passive constructions for historical descriptions"
    }
})

units.append({
    "unit": 46, "level": "B2", "theme": "Modali al passato", "theme_en": "Modal Verbs in the Past",
    "grammar_point": "Dovere/potere/volere al passato (ausiliare: avere o essere?)",
    "vocab": [
        {"it": "ho dovuto", "en": "I had to", "example": "Ho dovuto lavorare fino a tardi."},
        {"it": "sono dovuto andare", "en": "I had to go", "example": "Sono dovuto andare dal dottore."},
        {"it": "ho potuto", "en": "I was able to", "example": "Non ho potuto venire."},
        {"it": "sono potuto restare", "en": "I was able to stay", "example": "Non sono potuto restare."},
        {"it": "ho voluto", "en": "I wanted to", "example": "Ho voluto provare quel ristorante."},
        {"it": "non ce l'ho fatta", "en": "I couldn't manage", "example": "Non ce l'ho fatta a finire."},
        {"it": "riuscire a", "en": "to manage to", "example": "Sei riuscito a prenotare?"},
        {"it": "essere costretto", "en": "to be forced to", "example": "Sono stato costretto a rinunciare."},
        {"it": "avere l'occasione", "en": "to have the chance", "example": "Ho avuto l'occasione di viaggiare."},
        {"it": "toccare a", "en": "to be someone's turn", "example": "Tocca a me pagare."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ dovuto lavorare fino a tardi.", "answer": "Ho"},
        {"type": "fill", "sentence": "Sono dovuto _____ dal dottore.", "answer": "andare"},
        {"type": "fill", "sentence": "Non ce l'ho _____ a finire.", "answer": "fatta"}
    ],
    "scenario": {
        "title": "Explaining a missed flight",
        "setup": "You missed your flight and need to explain to the airline desk what happened.",
        "opening": "Mi dica, perché ha perso il volo?",
        "goal": "Explain past obligations and abilities using modali al passato"
    }
})

units.append({
    "unit": 47, "level": "B2", "theme": "Connettivi", "theme_en": "Connectives",
    "grammar_point": "Connettivi avanzati per testi complessi",
    "vocab": [
        {"it": "inoltre", "en": "furthermore", "example": "Inoltre, vorrei aggiungere una cosa."},
        {"it": "tuttavia", "en": "nevertheless", "example": "Tuttavia, ci sono dei rischi."},
        {"it": "pertanto", "en": "therefore", "example": "Pertanto, dobbiamo agire subito."},
        {"it": "da un lato... dall'altro", "en": "on one hand... on the other", "example": "Da un lato è bello, dall'altro è caro."},
        {"it": "in primo luogo", "en": "firstly", "example": "In primo luogo, esaminiamo i fatti."},
        {"it": "in secondo luogo", "en": "secondly", "example": "In secondo luogo, consideriamo i costi."},
        {"it": "di conseguenza", "en": "consequently", "example": "Di conseguenza, il prezzo è salito."},
        {"it": "eppure", "en": "and yet", "example": "Ha studiato tanto, eppure non ha passato."},
        {"it": "anzi", "en": "rather/on the contrary", "example": "Non è brutto, anzi è bellissimo."},
        {"it": "ciononostante", "en": "nonetheless", "example": "Ciononostante, ha vinto la gara."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____, vorrei aggiungere una cosa.", "answer": "Inoltre"},
        {"type": "fill", "sentence": "Ha studiato tanto, _____ non ha passato.", "answer": "eppure"},
        {"type": "fill", "sentence": "Non è brutto, _____ è bellissimo.", "answer": "anzi"}
    ],
    "scenario": {
        "title": "University presentation in Padua",
        "setup": "You're giving a short presentation on Italian cuisine to your class.",
        "opening": "Oggi parleremo dell'evoluzione della cucina italiana. In primo luogo...",
        "goal": "Structure an argument using advanced connectives"
    }
})

units.append({
    "unit": 48, "level": "B2", "theme": "Modi di dire", "theme_en": "Idioms",
    "grammar_point": "Espressioni idiomatiche italiane comuni",
    "vocab": [
        {"it": "in bocca al lupo", "en": "good luck (lit: in the wolf's mouth)", "example": "In bocca al lupo per l'esame!"},
        {"it": "non vedo l'ora", "en": "I can't wait", "example": "Non vedo l'ora di vederti!"},
        {"it": "fare il furbo", "en": "to play smart/cunning", "example": "Non fare il furbo con me."},
        {"it": "avere le mani in pasta", "en": "to have a finger in every pie", "example": "Lui ha le mani in pasta dappertutto."},
        {"it": "prendere in giro", "en": "to make fun of", "example": "Mi stai prendendo in giro?"},
        {"it": "non c'entra niente", "en": "it has nothing to do with it", "example": "Questo non c'entra niente."},
        {"it": "tirare avanti", "en": "to get by", "example": "Si tira avanti come si può."},
        {"it": "dare una mano", "en": "to give a hand", "example": "Mi dai una mano con la spesa?"},
        {"it": "averne abbastanza", "en": "to have had enough", "example": "Ne ho abbastanza di questa situazione."},
        {"it": "fare bella figura", "en": "to make a good impression", "example": "Vuole sempre fare bella figura."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Non vedo l'_____ di vederti!", "answer": "ora"},
        {"type": "fill", "sentence": "Mi stai prendendo in _____?", "answer": "giro"},
        {"type": "fill", "sentence": "Mi dai una _____ con la spesa?", "answer": "mano"}
    ],
    "scenario": {
        "title": "Coffee break gossip in Milan",
        "setup": "Colleagues are chatting during the coffee break using colorful expressions.",
        "opening": "Hai sentito del capo? Ha le mani in pasta dappertutto! E poi fa il furbo...",
        "goal": "Understand and use common Italian idioms in conversation"
    }
})

units.append({
    "unit": 49, "level": "B2", "theme": "Formale vs informale", "theme_en": "Formal vs Informal",
    "grammar_point": "Registro formale: Lei vs tu, condizionale di cortesia",
    "vocab": [
        {"it": "Le dispiacerebbe", "en": "would you mind (formal)", "example": "Le dispiacerebbe aspettare?"},
        {"it": "potrebbe", "en": "could you (formal)", "example": "Potrebbe ripetere, per favore?"},
        {"it": "La prego", "en": "I beg you (formal)", "example": "La prego, si accomodi."},
        {"it": "distinti saluti", "en": "yours faithfully", "example": "Distinti saluti, Marco Rossi."},
        {"it": "cordiali saluti", "en": "kind regards", "example": "Cordiali saluti."},
        {"it": "egregio", "en": "dear (formal m)", "example": "Egregio Dottore..."},
        {"it": "gentile", "en": "dear (formal, neutral)", "example": "Gentile Signora Bianchi..."},
        {"it": "dare del tu", "en": "to use informal you", "example": "Possiamo darci del tu?"},
        {"it": "dare del Lei", "en": "to use formal you", "example": "In ufficio diamo del Lei."},
        {"it": "con rispetto", "en": "with respect", "example": "Con rispetto, non sono d'accordo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Le _____ aspettare?", "answer": "dispiacerebbe"},
        {"type": "fill", "sentence": "La _____, si accomodi.", "answer": "prego"},
        {"type": "fill", "sentence": "Possiamo darci del _____?", "answer": "tu"}
    ],
    "scenario": {
        "title": "Meeting a business client in Rome",
        "setup": "You're meeting a new Italian client at their office for the first time.",
        "opening": "Egregio signore, benvenuto. Si accomodi, prego. Desidera un caffè?",
        "goal": "Navigate formal/informal registers appropriately"
    }
})

units.append({
    "unit": 50, "level": "B2", "theme": "Gerundio/Participio", "theme_en": "Gerund and Participle",
    "grammar_point": "Gerundio presente/passato + participio assoluto",
    "vocab": [
        {"it": "parlando", "en": "speaking/while speaking", "example": "Parlando con lui, ho capito."},
        {"it": "avendo finito", "en": "having finished", "example": "Avendo finito, sono uscito."},
        {"it": "pur essendo", "en": "despite being", "example": "Pur essendo stanco, ha continuato."},
        {"it": "uscendo", "en": "going out/upon leaving", "example": "Uscendo ho incontrato Maria."},
        {"it": "una volta arrivato", "en": "once arrived", "example": "Una volta arrivato, mi sono riposato."},
        {"it": "stando così le cose", "en": "things being so", "example": "Stando così le cose, rinuncio."},
        {"it": "vedendo", "en": "seeing", "example": "Vedendo la pioggia, ho preso l'ombrello."},
        {"it": "considerando", "en": "considering", "example": "Considerando tutto, è andata bene."},
        {"it": "essendo", "en": "being", "example": "Essendo italiano, amo la pasta."},
        {"it": "dato che", "en": "given that", "example": "Dato che piove, restiamo a casa."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "_____ con lui, ho capito.", "answer": "Parlando"},
        {"type": "fill", "sentence": "Pur _____ stanco, ha continuato.", "answer": "essendo"},
        {"type": "fill", "sentence": "Avendo _____, sono uscito.", "answer": "finito"}
    ],
    "scenario": {
        "title": "Storytelling at a writers' workshop in Turin",
        "setup": "You're workshopping a short story and the instructor pushes for more complex structures.",
        "opening": "Bene, proviamo a riscrivere questo paragrafo usando il gerundio. Per esempio...",
        "goal": "Use gerundio and participio to create elegant, complex sentences"
    }
})

units.append({
    "unit": 51, "level": "B2", "theme": "Discorso indiretto", "theme_en": "Reported Speech",
    "grammar_point": "Discorso indiretto con trasformazione dei tempi",
    "vocab": [
        {"it": "ha detto che", "en": "he/she said that", "example": "Ha detto che sarebbe venuto."},
        {"it": "mi ha chiesto se", "en": "he/she asked me if", "example": "Mi ha chiesto se volevo uscire."},
        {"it": "ha raccontato che", "en": "he/she told that", "example": "Ha raccontato che era stato in Giappone."},
        {"it": "ha spiegato che", "en": "he/she explained that", "example": "Ha spiegato che non poteva."},
        {"it": "ha promesso che", "en": "he/she promised that", "example": "Ha promesso che avrebbe chiamato."},
        {"it": "ha risposto che", "en": "he/she replied that", "example": "Ha risposto che non sapeva."},
        {"it": "ha aggiunto che", "en": "he/she added that", "example": "Ha aggiunto che era urgente."},
        {"it": "ha ammesso che", "en": "he/she admitted that", "example": "Ha ammesso che aveva sbagliato."},
        {"it": "ha negato che", "en": "he/she denied that", "example": "Ha negato che fosse vero."},
        {"it": "secondo lui/lei", "en": "according to him/her", "example": "Secondo lei, non è possibile."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Ha detto che _____ venuto.", "answer": "sarebbe"},
        {"type": "fill", "sentence": "Mi ha chiesto _____ volevo uscire.", "answer": "se"},
        {"type": "fill", "sentence": "Ha promesso che _____ chiamato.", "answer": "avrebbe"}
    ],
    "scenario": {
        "title": "Recounting a conversation to a friend",
        "setup": "You just had an intense conversation with your boss and are telling a friend about it.",
        "opening": "Non ci crederai! Sai cosa mi ha detto il capo oggi?",
        "goal": "Transform direct speech into reported speech with correct tense shifts"
    }
})

units.append({
    "unit": 52, "level": "B2", "theme": "Lessico finanziario", "theme_en": "Financial Vocabulary",
    "grammar_point": "Nominalizazione (verbo → sostantivo: investire → investimento)",
    "vocab": [
        {"it": "il conto in banca", "en": "bank account", "example": "Devo aprire un conto in banca."},
        {"it": "il mutuo", "en": "mortgage", "example": "Abbiamo chiesto un mutuo."},
        {"it": "le tasse", "en": "taxes", "example": "Le tasse in Italia sono alte."},
        {"it": "lo stipendio", "en": "salary", "example": "Lo stipendio arriva il 27."},
        {"it": "risparmiare", "en": "to save (money)", "example": "Cerco di risparmiare ogni mese."},
        {"it": "investire", "en": "to invest", "example": "Vuole investire in borsa."},
        {"it": "il debito", "en": "debt", "example": "Non ho debiti."},
        {"it": "la fattura", "en": "invoice", "example": "Devo pagare questa fattura."},
        {"it": "il bilancio", "en": "budget/balance sheet", "example": "Il bilancio è in attivo."},
        {"it": "la rata", "en": "installment", "example": "Pago il mutuo a rate."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Devo aprire un _____ in banca.", "answer": "conto"},
        {"type": "fill", "sentence": "Le _____ in Italia sono alte.", "answer": "tasse"},
        {"type": "fill", "sentence": "Pago il mutuo a _____.", "answer": "rate"}
    ],
    "scenario": {
        "title": "Meeting with a financial advisor in Milan",
        "setup": "You're consulting a financial advisor about buying a house.",
        "opening": "Allora, vediamo la sua situazione finanziaria. Quanto riesce a risparmiare al mese?",
        "goal": "Discuss finances using specialized vocabulary and nominalization"
    }
})

units.append({
    "unit": 53, "level": "B2", "theme": "Cultura italiana", "theme_en": "Italian Culture",
    "grammar_point": "Frasi scisse (è...che, è...a) per enfasi",
    "vocab": [
        {"it": "il Rinascimento", "en": "the Renaissance", "example": "Il Rinascimento è nato a Firenze."},
        {"it": "il patrimonio", "en": "heritage", "example": "L'Italia ha un immenso patrimonio culturale."},
        {"it": "la tradizione", "en": "tradition", "example": "Le tradizioni variano da regione a regione."},
        {"it": "il dialetto", "en": "dialect", "example": "In ogni regione si parla un dialetto diverso."},
        {"it": "la sagra", "en": "local festival", "example": "Andiamo alla sagra del tartufo."},
        {"it": "il campanilismo", "en": "local pride/rivalry", "example": "Il campanilismo è molto italiano."},
        {"it": "il made in Italy", "en": "made in Italy (brand value)", "example": "Il made in Italy è famoso nel mondo."},
        {"it": "la dolce vita", "en": "the sweet life", "example": "Tutti sognano la dolce vita."},
        {"it": "il Belpaese", "en": "beautiful country (Italy)", "example": "L'Italia è il Belpaese."},
        {"it": "l'opera", "en": "opera", "example": "L'opera italiana è famosa nel mondo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Il Rinascimento è _____ a Firenze.", "answer": "nato"},
        {"type": "fill", "sentence": "L'Italia ha un immenso _____ culturale.", "answer": "patrimonio"},
        {"type": "fill", "sentence": "Le tradizioni variano da _____ a regione.", "answer": "regione"}
    ],
    "scenario": {
        "title": "Cultural exchange evening in Bologna",
        "setup": "You're at an international student night and everyone is sharing their culture.",
        "opening": "L'Italia non è solo pizza e mandolino! È la cultura che ci rende unici. Cosa vi colpisce dell'Italia?",
        "goal": "Discuss Italian culture with emphasis constructions"
    }
})

units.append({
    "unit": 54, "level": "B2", "theme": "Argomentare", "theme_en": "Arguing a Point",
    "grammar_point": "Strutture per argomentare (non solo...ma anche, tanto più che)",
    "vocab": [
        {"it": "non solo... ma anche", "en": "not only... but also", "example": "Non solo è bello, ma anche utile."},
        {"it": "tanto più che", "en": "all the more so because", "example": "Tanto più che non c'è alternativa."},
        {"it": "a maggior ragione", "en": "all the more reason", "example": "A maggior ragione dovremmo agire."},
        {"it": "d'altra parte", "en": "on the other hand", "example": "D'altra parte, capisco il problema."},
        {"it": "in realtà", "en": "actually/in reality", "example": "In realtà, è più complesso."},
        {"it": "sostenere", "en": "to argue/maintain", "example": "Sostengo che sia sbagliato."},
        {"it": "confutare", "en": "to refute", "example": "È difficile confutare questa tesi."},
        {"it": "la tesi", "en": "thesis/argument", "example": "La tua tesi è convincente."},
        {"it": "il punto di vista", "en": "point of view", "example": "Capisco il tuo punto di vista."},
        {"it": "in definitiva", "en": "ultimately", "example": "In definitiva, sono d'accordo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Non solo è bello, _____ anche utile.", "answer": "ma"},
        {"type": "fill", "sentence": "In _____, è più complesso.", "answer": "realtà"},
        {"type": "fill", "sentence": "La tua _____ è convincente.", "answer": "tesi"}
    ],
    "scenario": {
        "title": "Philosophy seminar in Pisa",
        "setup": "You're in a heated academic discussion about AI ethics.",
        "opening": "La mia tesi è che l'intelligenza artificiale non potrà mai sostituire l'uomo. Chi non è d'accordo?",
        "goal": "Construct and defend arguments using advanced rhetorical structures"
    }
})

units.append({
    "unit": 55, "level": "B2", "theme": "Email formali", "theme_en": "Formal Emails",
    "grammar_point": "Registro epistolare formale (gerundio, participio, formule)",
    "vocab": [
        {"it": "in allegato", "en": "attached", "example": "In allegato troverà il documento."},
        {"it": "con riferimento a", "en": "with reference to", "example": "Con riferimento alla Sua email..."},
        {"it": "La informo che", "en": "I inform you that", "example": "La informo che l'ordine è pronto."},
        {"it": "in attesa di", "en": "waiting for", "example": "In attesa di un Suo riscontro."},
        {"it": "porgo distinti saluti", "en": "I send my regards", "example": "Porgo distinti saluti."},
        {"it": "resto a disposizione", "en": "I remain at your disposal", "example": "Resto a disposizione per chiarimenti."},
        {"it": "spettabile", "en": "esteemed (for companies)", "example": "Spettabile Ditta Rossi..."},
        {"it": "sollecitare", "en": "to urge/follow up", "example": "Vorrei sollecitare una risposta."},
        {"it": "il riscontro", "en": "reply/feedback", "example": "Attendo un cortese riscontro."},
        {"it": "come da accordi", "en": "as agreed", "example": "Come da accordi, invio il preventivo."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "In _____ troverà il documento.", "answer": "allegato"},
        {"type": "fill", "sentence": "In attesa di un Suo _____.", "answer": "riscontro"},
        {"type": "fill", "sentence": "Come da _____, invio il preventivo.", "answer": "accordi"}
    ],
    "scenario": {
        "title": "Writing to a supplier in Italy",
        "setup": "You need to write a formal email to request a product quote.",
        "opening": "You received an email: 'Egregio Signore, con riferimento alla Sua richiesta del 15 marzo...'",
        "goal": "Write and respond to formal emails using proper business Italian"
    }
})

units.append({
    "unit": 56, "level": "B2", "theme": "Politica/Società", "theme_en": "Politics and Society",
    "grammar_point": "Congiuntivo imperfetto per espressioni di desiderio/dubbio al passato",
    "vocab": [
        {"it": "il governo", "en": "government", "example": "Il governo ha approvato la legge."},
        {"it": "la legge", "en": "law", "example": "La legge è uguale per tutti."},
        {"it": "il diritto", "en": "right", "example": "Tutti hanno il diritto di voto."},
        {"it": "il cittadino", "en": "citizen", "example": "I cittadini devono votare."},
        {"it": "la democrazia", "en": "democracy", "example": "La democrazia è un valore fondamentale."},
        {"it": "la disuguaglianza", "en": "inequality", "example": "La disuguaglianza è un problema serio."},
        {"it": "il welfare", "en": "welfare", "example": "Il welfare italiano è in crisi."},
        {"it": "l'immigrazione", "en": "immigration", "example": "L'immigrazione è un tema complesso."},
        {"it": "la manifestazione", "en": "demonstration/protest", "example": "C'è una manifestazione in piazza."},
        {"it": "la riforma", "en": "reform", "example": "Serve una riforma del sistema."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "La legge è _____ per tutti.", "answer": "uguale"},
        {"type": "fill", "sentence": "Tutti hanno il _____ di voto.", "answer": "diritto"},
        {"type": "fill", "sentence": "Serve una _____ del sistema.", "answer": "riforma"}
    ],
    "scenario": {
        "title": "Political café debate in Naples",
        "setup": "You're at a bar where locals are passionately discussing current affairs.",
        "opening": "Secondo te, il governo sta facendo abbastanza per i giovani? Vorrei che le cose cambiassero.",
        "goal": "Discuss social and political issues using congiuntivo imperfetto"
    }
})

units.append({
    "unit": 57, "level": "B2", "theme": "Arte/Cultura", "theme_en": "Art and Culture",
    "grammar_point": "Passato remoto per narrazioni storiche/letterarie",
    "vocab": [
        {"it": "il capolavoro", "en": "masterpiece", "example": "La Gioconda è un capolavoro."},
        {"it": "lo scultore", "en": "sculptor", "example": "Michelangelo fu un grande scultore."},
        {"it": "il pittore", "en": "painter", "example": "Caravaggio fu un pittore rivoluzionario."},
        {"it": "l'affresco", "en": "fresco", "example": "La Cappella Sistina ha affreschi meravigliosi."},
        {"it": "la mostra", "en": "exhibition", "example": "Andiamo a vedere la mostra."},
        {"it": "il romanzo", "en": "novel", "example": "I Promessi Sposi è un romanzo famoso."},
        {"it": "la poesia", "en": "poetry/poem", "example": "Amo la poesia di Leopardi."},
        {"it": "ispirare", "en": "to inspire", "example": "L'Italia ispira artisti da secoli."},
        {"it": "il movimento", "en": "movement (artistic)", "example": "Il Futurismo fu un movimento italiano."},
        {"it": "l'eredità", "en": "legacy", "example": "L'eredità di Roma è immensa."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "La Gioconda è un _____.", "answer": "capolavoro"},
        {"type": "fill", "sentence": "Michelangelo _____ un grande scultore.", "answer": "fu"},
        {"type": "fill", "sentence": "Il Futurismo fu un _____ italiano.", "answer": "movimento"}
    ],
    "scenario": {
        "title": "Gallery visit at the Uffizi",
        "setup": "You're visiting the Uffizi Gallery with an art history student.",
        "opening": "Guarda questo Botticelli! Sai che dipinse La Primavera nel 1482?",
        "goal": "Discuss art and history using passato remoto"
    }
})

units.append({
    "unit": 58, "level": "B2", "theme": "Sport", "theme_en": "Sports",
    "grammar_point": "Lessico sportivo + stare + gerundio per azioni in corso",
    "vocab": [
        {"it": "la partita", "en": "match/game", "example": "Hai visto la partita ieri?"},
        {"it": "la squadra", "en": "team", "example": "Per quale squadra tifi?"},
        {"it": "il campionato", "en": "championship/league", "example": "Il campionato italiano è competitivo."},
        {"it": "l'allenamento", "en": "training", "example": "L'allenamento è alle sei."},
        {"it": "il tifoso", "en": "fan/supporter", "example": "Sono un tifoso della Roma."},
        {"it": "segnare un gol", "en": "to score a goal", "example": "Ha segnato un gol fantastico."},
        {"it": "vincere", "en": "to win", "example": "Abbiamo vinto tre a uno."},
        {"it": "perdere", "en": "to lose", "example": "Purtroppo abbiamo perso."},
        {"it": "pareggiare", "en": "to draw/tie", "example": "Hanno pareggiato zero a zero."},
        {"it": "l'arbitro", "en": "referee", "example": "L'arbitro ha sbagliato la decisione."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Per quale _____ tifi?", "answer": "squadra"},
        {"type": "fill", "sentence": "Ha segnato un _____ fantastico.", "answer": "gol"},
        {"type": "fill", "sentence": "Hanno _____ zero a zero.", "answer": "pareggiato"}
    ],
    "scenario": {
        "title": "Watching a Serie A match at a bar in Rome",
        "setup": "You're watching a live football game with locals at a sports bar.",
        "opening": "Dai, dai! Stanno attaccando! Ma che sta facendo l'arbitro?!",
        "goal": "Comment on live sports and discuss teams using sports vocabulary"
    }
})

units.append({
    "unit": 59, "level": "B2", "theme": "Ironia/Umorismo", "theme_en": "Irony and Humor",
    "grammar_point": "Understatement, litote, ironia (mica, proprio, altro che)",
    "vocab": [
        {"it": "mica", "en": "not at all/by no means", "example": "Non è mica facile!"},
        {"it": "proprio", "en": "really/just", "example": "Proprio bello, eh? (ironico)"},
        {"it": "altro che", "en": "far from it / you bet", "example": "Altro che vacanza, ho lavorato!"},
        {"it": "figurati", "en": "don't mention it / imagine", "example": "Grazie! — Figurati!"},
        {"it": "ma dai", "en": "come on / no way", "example": "Ma dai, stai scherzando!"},
        {"it": "scherzare", "en": "to joke", "example": "Sto solo scherzando."},
        {"it": "l'ironia", "en": "irony", "example": "L'ironia è difficile in un'altra lingua."},
        {"it": "il doppio senso", "en": "double meaning", "example": "Quella frase ha un doppio senso."},
        {"it": "sfottere", "en": "to tease/mock", "example": "Mi sfottono sempre per il mio accento."},
        {"it": "fare la battuta", "en": "to crack a joke", "example": "Ha fatto una battuta divertente."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Non è _____ facile!", "answer": "mica"},
        {"type": "fill", "sentence": "_____ che vacanza, ho lavorato!", "answer": "Altro"},
        {"type": "fill", "sentence": "Ha fatto una _____ divertente.", "answer": "battuta"}
    ],
    "scenario": {
        "title": "Stand-up comedy night in Milan",
        "setup": "You're at a comedy show and chatting about humor with an Italian friend.",
        "opening": "Ah, l'ironia italiana! Non è mica facile capirla. Tipo: 'Bella giornata, eh?' mentre diluvia.",
        "goal": "Understand and use Italian irony, understatement, and humor"
    }
})

units.append({
    "unit": 60, "level": "B2", "theme": "B2 Review", "theme_en": "B2 Review",
    "grammar_point": "Revisione: congiuntivo, condizionale passato, periodo ipotetico, passivo, connettivi",
    "vocab": [
        {"it": "padroneggiare", "en": "to master", "example": "Voglio padroneggiare l'italiano."},
        {"it": "sfumatura", "en": "nuance", "example": "L'italiano è pieno di sfumature."},
        {"it": "il registro", "en": "register (language)", "example": "Bisogna saper cambiare registro."},
        {"it": "fluente", "en": "fluent", "example": "Vorrei diventare fluente."},
        {"it": "il madrelingua", "en": "native speaker", "example": "Parlo come un madrelingua."},
        {"it": "arricchire", "en": "to enrich", "example": "Leggere arricchisce il vocabolario."},
        {"it": "approfondire", "en": "to deepen", "example": "Devo approfondire la grammatica."},
        {"it": "la consapevolezza", "en": "awareness", "example": "Ho maggiore consapevolezza linguistica."},
        {"it": "il traguardo", "en": "goal/milestone", "example": "Ho raggiunto un bel traguardo."},
        {"it": "il percorso", "en": "path/journey", "example": "È stato un bel percorso."}
    ],
    "exercises": [
        {"type": "fill", "sentence": "Voglio _____ l'italiano.", "answer": "padroneggiare"},
        {"type": "fill", "sentence": "L'italiano è pieno di _____.", "answer": "sfumature"},
        {"type": "fill", "sentence": "Ho raggiunto un bel _____.", "answer": "traguardo"}
    ],
    "scenario": {
        "title": "Farewell dinner with your Italian teacher",
        "setup": "It's your last lesson and your teacher reflects on your progress.",
        "opening": "Bravissimo! Hai fatto un percorso incredibile. Se penso a quando hai iniziato... Come ti senti adesso?",
        "goal": "Demonstrate all B2 skills: argue, hypothesize, use formal register, tell stories"
    }
})

# Write the file
with open("/home/node/.openclaw/workspace/repos/italian-tutor/curriculum/units.json", "w") as f:
    json.dump(units, f, ensure_ascii=False, indent=2)

print(f"Written {len(units)} units")