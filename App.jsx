import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  BookOpen, Mic, PenTool, Headphones, BrainCircuit,
  LayoutDashboard, ChevronLeft, ChevronRight, Sparkles, 
  Check, X, Book, BookText, Pencil, Zap, RefreshCcw, 
  Volume2, MessageCircle, Star, Target, ShieldCheck,
  Languages, GraduationCap, Users, Home, Play, StopCircle, RefreshCw,
  ArrowLeft, ArrowRight
} from 'lucide-react';

const VOCAB_DATA = {
  "Food & Drinks": [
    { emoji: '🍎', word: 'apple', example: 'I eat an apple.' }, { emoji: '🍌', word: 'banana', example: 'I like banana.' }, { emoji: '🍞', word: 'bread', example: 'Bread is soft.' }, { emoji: '🥚', word: 'egg', example: 'I eat an egg.' }, { emoji: '🍗', word: 'chicken', example: 'Chicken is good.' }, { emoji: '🍚', word: 'rice', example: 'I eat rice.' }, { emoji: '🥛', word: 'milk', example: 'Milk is cold.' }, { emoji: '💧', word: 'water', example: 'I drink water.' }, { emoji: '☕', word: 'coffee', example: 'Coffee is hot.' }, { emoji: '🥤', word: 'soda', example: 'I drink soda.' }, { emoji: '🍕', word: 'pizza', example: 'Pizza is delicious.' }, { emoji: '🍔', word: 'burger', example: 'I want a burger.' }, { emoji: '🥗', word: 'salad', example: 'Salad is healthy.' }, { emoji: '🍰', word: 'cake', example: 'Cake is sweet.' }, { emoji: '🍦', word: 'ice cream', example: 'Ice cream is cold.' }, { emoji: '🧀', word: 'cheese', example: 'Cheese is yellow.' }, { emoji: '🍟', word: 'fries', example: 'Fries are salty.' }, { emoji: '🌭', word: 'hot dog', example: 'The hot dog is big.' }, { emoji: '🥓', word: 'bacon', example: 'I like bacon.' }, { emoji: '🍇', word: 'grapes', example: 'Grapes are purple.' }, { emoji: '🍓', word: 'strawberry', example: 'The strawberry is red.' }, { emoji: '🍍', word: 'pineapple', example: 'Pineapple is sweet.' }, { emoji: '🥭', word: 'mango', example: 'I like mango.' }, { emoji: '🍉', word: 'watermelon', example: 'Watermelon is big.' }, { emoji: '🍒', word: 'cherry', example: 'The cherry is small.' }, { emoji: '🍑', word: 'peach', example: 'Peach is soft.' }, { emoji: '🍋', word: 'lemon', example: 'The lemon is sour.' }, { emoji: '🥥', word: 'coconut', example: 'Coconut is hard.' }, { emoji: '🥕', word: 'carrot', example: 'Carrot is orange.' }, { emoji: '🌽', word: 'corn', example: 'Corn is yellow.' }, { emoji: '🥔', word: 'potato', example: 'Potato is brown.' }, { emoji: '🍅', word: 'tomato', example: 'Tomato is red.' }, { emoji: '🥒', word: 'cucumber', example: 'Cucumber is green.' }, { emoji: '🥦', word: 'broccoli', example: 'Broccoli is healthy.' }, { emoji: '🧅', word: 'onion', example: 'The onion is white.' }, { emoji: '🧄', word: 'garlic', example: 'Garlic is small.' }, { emoji: '🍄', word: 'mushroom', example: 'The mushroom is brown.' }, { emoji: '🥬', word: 'lettuce', example: 'Lettuce is green.' }, { emoji: '🌮', word: 'taco', example: 'The taco is good.' }, { emoji: '🌯', word: 'burrito', example: 'I want a burrito.' }, { emoji: '🍜', word: 'noodles', example: 'Noodles are hot.' }, { emoji: '🍝', word: 'pasta', example: 'Pasta is good.' }, { emoji: '🍪', word: 'cookie', example: 'The cookie is sweet.' }, { emoji: '🍩', word: 'donut', example: 'The donut is round.' }, { emoji: '🍫', word: 'chocolate', example: 'Chocolate is tasty.' }, { emoji: '🍯', word: 'honey', example: 'Honey is sweet.' }, { emoji: '🧃', word: 'juice', example: 'I drink juice.' }, { emoji: '🍵', word: 'tea', example: 'Tea is hot.' }, { emoji: '🥤', word: 'smoothie', example: 'The smoothie is cold.' }, { emoji: '🍾', word: 'bottle', example: 'The bottle is blue.' }
  ],
  "Travel & Transportation": [
    { emoji: '✈️', word: 'airplane', example: 'The airplane is big.' }, { emoji: '🚗', word: 'car', example: 'The car is blue.' }, { emoji: '🚌', word: 'bus', example: 'I take the bus.' }, { emoji: '🚕', word: 'taxi', example: 'The taxi is yellow.' }, { emoji: '🚆', word: 'train', example: 'The train is fast.' }, { emoji: '🚲', word: 'bike', example: 'My bike is new.' }, { emoji: '🏨', word: 'hotel', example: 'The hotel is nice.' }, { emoji: '🧳', word: 'suitcase', example: 'My suitcase is heavy.' }, { emoji: '🎫', word: 'ticket', example: 'I have a ticket.' }, { emoji: '🛂', word: 'passport', example: 'I need my passport.' }, { emoji: '🗺️', word: 'map', example: 'The map is helpful.' }, { emoji: '🏖️', word: 'beach', example: 'The beach is hot.' }, { emoji: '🛫', word: 'airport', example: 'I go to the airport.' }, { emoji: '➡️', word: 'right', example: 'Turn to the right.' }, { emoji: '⬅️', word: 'left', example: 'Turn to the left.' }, { emoji: '⬆️', word: 'straight', example: 'Go straight now.' }, { emoji: '🚦', word: 'traffic light', example: 'The light is red.' }, { emoji: '⛽', word: 'gas station', example: 'The station is near.' }, { emoji: '🛣️', word: 'highway', example: 'The highway is long.' }, { emoji: '🚏', word: 'bus stop', example: 'I wait at the stop.' }, { emoji: '🚇', word: 'subway', example: 'The subway is fast.' }, { emoji: '🚢', word: 'ship', example: 'The ship is on water.' }, { emoji: '⛴️', word: 'ferry', example: 'The ferry is big.' }, { emoji: '🚁', word: 'helicopter', example: 'It is a helicopter.' }, { emoji: '🛵', word: 'scooter', example: 'My scooter is fast.' }, { emoji: '🚜', word: 'tractor', example: 'The tractor is green.' }, { emoji: '🏝️', word: 'island', example: 'The island is small.' }, { emoji: '🏕️', word: 'camping', example: 'I like camping.' }, { emoji: '🧭', word: 'direction', example: 'What is the direction?' }, { emoji: '🗽', word: 'monument', example: 'The monument is big.' }, { emoji: '🏰', word: 'castle', example: 'The castle is old.' }, { emoji: '🌉', word: 'bridge', example: 'The bridge is long.' }, { emoji: '🏞️', word: 'park', example: 'The park is green.' }, { emoji: '🏔️', word: 'mountain', example: 'The mountain is high.' }, { emoji: '🌋', word: 'volcano', example: 'The volcano is hot.' }, { emoji: '🏖️', word: 'vacation', example: 'I like my vacation.' }, { emoji: '🛎️', word: 'reception', example: 'Go to the reception.' }, { emoji: '🛏️', word: 'room', example: 'The room is clean.' }, { emoji: '🚪', word: 'exit', example: 'The exit is there.' }, { emoji: '🎒', word: 'backpack', example: 'My backpack is new.' }, { emoji: '📷', word: 'tourist', example: 'I am a tourist.' }, { emoji: '🧍', word: 'traveler', example: 'He is a traveler.' }, { emoji: '🛬', word: 'arrival', example: 'This is the arrival.' }, { emoji: '🛫', word: 'departure', example: 'This is the departure.' }, { emoji: '🧳', word: 'luggage', example: 'Where is my luggage?' }, { emoji: '🚖', word: 'driver', example: 'The driver is kind.' }, { emoji: '🪪', word: 'ID card', example: 'Show your ID card.' }, { emoji: '📍', word: 'location', example: 'What is the location?' }, { emoji: '🌍', word: 'country', example: 'My country is nice.' }, { emoji: '🏙️', word: 'city', example: 'The city is big.' }
  ],
  "Daily Life": [
    { emoji: '👋', word: 'hello', example: 'Hello, my friend.' }, { emoji: '🌅', word: 'morning', example: 'Good morning to you.' }, { emoji: '🌙', word: 'night', example: 'Good night now.' }, { emoji: '😊', word: 'happy', example: 'I am very happy.' }, { emoji: '😢', word: 'sad', example: 'Do not be sad.' }, { emoji: '👨‍👩‍👧', word: 'family', example: 'I love my family.' }, { emoji: '👩', word: 'mother', example: 'My mother is nice.' }, { emoji: '👨', word: 'father', example: 'My father is tall.' }, { emoji: '🏠', word: 'home', example: 'I am at home.' }, { emoji: '🛏️', word: 'sleep', example: 'I want to sleep.' }, { emoji: '🍽️', word: 'eat', example: 'I eat every day.' }, { emoji: '🚿', word: 'shower', example: 'I take a shower.' }, { emoji: '📚', word: 'study', example: 'I study English.' }, { emoji: '💼', word: 'work', example: 'I go to work.' }, { emoji: '🎮', word: 'hobby', example: 'My hobby is fun.' }, { emoji: '🦷', word: 'brush', example: 'I brush my teeth.' }, { emoji: '👕', word: 'clothes', example: 'My clothes are clean.' }, { emoji: '👟', word: 'shoes', example: 'My shoes are new.' }, { emoji: '⌚', word: 'watch', example: 'The watch is old.' }, { emoji: '📱', word: 'phone', example: 'Where is my phone?' }, { emoji: '🧴', word: 'soap', example: 'The soap is good.' }, { emoji: '🪥', word: 'toothbrush', example: 'Use your toothbrush.' }, { emoji: '🪞', word: 'mirror', example: 'Look in the mirror.' }, { emoji: '🚪', word: 'door', example: 'Open the door.' }, { emoji: '🪑', word: 'chair', example: 'Sit on the chair.' }, { emoji: '📺', word: 'TV', example: 'The TV is on.' }, { emoji: '💡', word: 'light', example: 'The light is bright.' }, { emoji: '🧹', word: 'clean', example: 'I clean my room.' }, { emoji: '🍳', word: 'cook', example: 'I cook for you.' }, { emoji: '🧺', word: 'laundry', example: 'Do the laundry now.' }, { emoji: '🛒', word: 'shopping', example: 'Go to shopping.' }, { emoji: '🎵', word: 'music', example: 'I like this music.' }, { emoji: '📖', word: 'read', example: 'I read a book.' }, { emoji: '✍️', word: 'write', example: 'Write your name.' }, { emoji: '🧑', word: 'friend', example: 'He is my friend.' }, { emoji: '👶', word: 'baby', example: 'The baby is small.' }, { emoji: '👵', word: 'grandmother', example: 'My grandmother is nice.' }, { emoji: '👴', word: 'grandfather', example: 'My grandfather is tall.' }, { emoji: '💤', word: 'tired', example: 'I am very tired.' }, { emoji: '😍', word: 'excited', example: 'I am so excited.' }, { emoji: '😡', word: 'angry', example: 'Do not be angry.' }, { emoji: '😴', word: 'sleepy', example: 'I am very sleepy.' }, { emoji: '🤒', word: 'sick', example: 'I am feeling sick.' }, { emoji: '🥳', word: 'party', example: 'The party is fun.' }, { emoji: '🎂', word: 'birthday', example: 'Today is my birthday.' }, { emoji: '⏰', word: 'alarm', example: 'Set the alarm.' }, { emoji: '🚌', word: 'commute', example: 'The commute is long.' }, { emoji: '☀️', word: 'afternoon', example: 'Good afternoon.' }, { emoji: '🌧️', word: 'rainy day', example: 'It is a rainy day.' }, { emoji: '❄️', word: 'cold', example: 'It is very cold.' }
  ],
  "House & Objects": [
    { emoji: '🏠', word: 'house', example: 'My house is big.' }, { emoji: '🚪', word: 'door', example: 'Close the door.' }, { emoji: '🪟', word: 'window', example: 'Open the window.' }, { emoji: '🛏️', word: 'bed', example: 'The bed is soft.' }, { emoji: '🪑', word: 'chair', example: 'Where is my chair?' }, { emoji: '🛋️', word: 'sofa', example: 'Sit on the sofa.' }, { emoji: '🍽️', word: 'plate', example: 'The plate is clean.' }, { emoji: '🥄', word: 'spoon', example: 'I need a spoon.' }, { emoji: '🔑', word: 'key', example: 'Where is the key?' }, { emoji: '📱', word: 'phone', example: 'My phone is new.' }, { emoji: '💡', word: 'lamp', example: 'The lamp is bright.' }, { emoji: '📺', word: 'TV', example: 'Watch the TV.' }, { emoji: '🧼', word: 'soap', example: 'Wash with soap.' }, { emoji: '🪞', word: 'mirror', example: 'That mirror is big.' }, { emoji: '👕', word: 'shirt', example: 'My shirt is red.' }, { emoji: '👖', word: 'pants', example: 'My pants are blue.' }, { emoji: '🧦', word: 'socks', example: 'I need my socks.' }, { emoji: '👟', word: 'shoes', example: 'Tie your shoes.' }, { emoji: '🧥', word: 'jacket', example: 'It is my jacket.' }, { emoji: '🎒', word: 'backpack', example: 'Put it in the bag.' }, { emoji: '🧴', word: 'shampoo', example: 'Use the shampoo.' }, { emoji: '🪥', word: 'toothbrush', example: 'I need a brush.' }, { emoji: '🚽', word: 'toilet', example: 'Where is the toilet?' }, { emoji: '🚿', word: 'shower', example: 'I like the shower.' }, { emoji: '🧻', word: 'paper', example: 'I need some paper.' }, { emoji: '🧺', word: 'basket', example: 'Put it in the basket.' }, { emoji: '🧹', word: 'broom', example: 'Use the broom.' }, { emoji: '🪣', word: 'bucket', example: 'The bucket is full.' }, { emoji: '🖼️', word: 'picture', example: 'The picture is nice.' }, { emoji: '🕰️', word: 'clock', example: 'The clock is fast.' }, { emoji: '🧯', word: 'extinguisher', example: 'It is an extinguisher.' }, { emoji: '🧸', word: 'toy', example: 'This is my toy.' }, { emoji: '📚', word: 'shelf', example: 'Put it on the shelf.' }, { emoji: '🪴', word: 'plant', example: 'Water the plant.' }, { emoji: '🛒', word: 'cart', example: 'Push the cart.' }, { emoji: '🧊', word: 'fridge', example: 'The fridge is cold.' }, { emoji: '🔥', word: 'stove', example: 'The stove is hot.' }, { emoji: '🍳', word: 'pan', example: 'The pan is round.' }, { emoji: '🍴', word: 'fork', example: 'Use the fork.' }, { emoji: '🥢', word: 'chopsticks', example: 'I use chopsticks.' }, { emoji: '🫖', word: 'kettle', example: 'The kettle is hot.' }, { emoji: '🪜', word: 'ladder', example: 'The ladder is tall.' }, { emoji: '🧰', word: 'toolbox', example: 'Where is the toolbox?' }, { emoji: '💻', word: 'laptop', example: 'My laptop is fast.' }, { emoji: '⌨️', word: 'keyboard', example: 'The keyboard is black.' }, { emoji: '🖱️', word: 'mouse', example: 'Use the computer mouse.' }, { emoji: '🔌', word: 'plug', example: 'Where is the plug?' }, { emoji: '🔋', word: 'battery', example: 'The battery is low.' }, { emoji: '📦', word: 'box', example: 'The box is heavy.' }, { emoji: '🗑️', word: 'trash can', example: 'Use the trash can.' }
  ],
  "People & Body": [
    { emoji: '👤', word: 'person', example: 'That is a person.' }, { emoji: '👁️', word: 'eye', example: 'I have one eye.' }, { emoji: '👂', word: 'ear', example: 'I hear with my ear.' }, { emoji: '👃', word: 'nose', example: 'The nose is small.' }, { emoji: '👄', word: 'mouth', example: 'Open your mouth.' }, { emoji: '✋', word: 'hand', example: 'Give me your hand.' }, { emoji: '🦶', word: 'foot', example: 'My foot hurts.' }, { emoji: '🦵', word: 'leg', example: 'My leg is tired.' }, { emoji: '💪', word: 'arm', example: 'My arm is strong.' }, { emoji: '🧠', word: 'head', example: 'Use your head.' }, { emoji: '❤️', word: 'heart', example: 'My heart is good.' }, { emoji: '🤒', word: 'sick', example: 'I am very sick.' }, { emoji: '💊', word: 'medicine', example: 'Take your medicine.' }, { emoji: '🏃', word: 'run', example: 'I like to run.' }, { emoji: '😊', word: 'smile', example: 'Please smile for me.' }, { emoji: '🦷', word: 'teeth', example: 'Brush your teeth.' }, { emoji: '👅', word: 'tongue', example: 'Stick out your tongue.' }, { emoji: '🧑‍🦱', word: 'hair', example: 'My hair is brown.' }, { emoji: '🩹', word: 'bandage', example: 'Put on a bandage.' }, { emoji: '🫀', word: 'chest', example: 'My chest hurts.' }, { emoji: '🧘', word: 'exercise', example: 'I need exercise.' }, { emoji: '🏋️', word: 'gym', example: 'I go to the gym.' }, { emoji: '🚶', word: 'walk', example: 'Let us walk.' }, { emoji: '😴', word: 'sleep', example: 'Time to sleep.' }, { emoji: '🥱', word: 'tired', example: 'Are you tired?' }, { emoji: '😄', word: 'laugh', example: 'I like to laugh.' }, { emoji: '😭', word: 'cry', example: 'Do not cry.' }, { emoji: '😡', word: 'angry', example: 'He is very angry.' }, { emoji: '😍', word: 'love', example: 'I love you.' }, { emoji: '😨', word: 'scared', example: 'I am so scared.' }, { emoji: '🤔', word: 'think', example: 'Let me think.' }, { emoji: '🤕', word: 'hurt', example: 'I am hurt.' }, { emoji: '🧑', word: 'boy', example: 'The boy is happy.' }, { emoji: '👧', word: 'girl', example: 'The girl is nice.' }, { emoji: '👩', word: 'woman', example: 'She is a woman.' }, { emoji: '👨', word: 'man', example: 'He is a man.' }, { emoji: '👶', word: 'baby', example: 'The baby is cute.' }, { emoji: '👵', word: 'grandmother', example: 'I love grandmother.' }, { emoji: '👴', word: 'grandfather', example: 'I love grandfather.' }, { emoji: '👫', word: 'couple', example: 'They are a couple.' }, { emoji: '🤝', word: 'friend', example: 'He is my best friend.' }, { emoji: '🧍', word: 'stand', example: 'Please stand up.' }, { emoji: '🪑', word: 'sit', example: 'Please sit down.' }, { emoji: '🏊', word: 'swim', example: 'I like to swim.' }, { emoji: '🚴', word: 'bike', example: 'Ride your bike.' }, { emoji: '⚽', word: 'soccer', example: 'Soccer is fun.' }, { emoji: '🏀', word: 'basketball', example: 'Play basketball.' }, { emoji: '🎾', word: 'tennis', example: 'I play tennis.' }, { emoji: '🥊', word: 'boxing', example: 'He does boxing.' }, { emoji: '🩺', word: 'doctor', example: 'See the doctor.' }
  ],
  "Time & Nature": [
    { emoji: '☀️', word: 'sun', example: 'The sun is hot.' }, { emoji: '🌙', word: 'moon', example: 'The moon is bright.' }, { emoji: '⭐', word: 'star', example: 'The star is high.' }, { emoji: '🌧️', word: 'rain', example: 'I like the rain.' }, { emoji: '☁️', word: 'cloud', example: 'The cloud is white.' }, { emoji: '❄️', word: 'snow', example: 'I like the snow.' }, { emoji: '🌬️', word: 'wind', example: 'The wind is strong.' }, { emoji: '🌳', word: 'tree', example: 'The tree is tall.' }, { emoji: '🌸', word: 'flower', example: 'The flower is nice.' }, { emoji: '🐶', word: 'dog', example: 'The dog is smart.' }, { emoji: '🐱', word: 'cat', example: 'The cat is soft.' }, { emoji: '🐦', word: 'bird', example: 'The bird can fly.' }, { emoji: '📅', word: 'day', example: 'Today is a good day.' }, { emoji: '⏰', word: 'time', example: 'What time is it?' }, { emoji: '🌎', word: 'world', example: 'The world is big.' }, { emoji: '🌊', word: 'ocean', example: 'The ocean is blue.' }, { emoji: '🏔️', word: 'mountain', example: 'The mountain is high.' }, { emoji: '🌋', word: 'volcano', example: 'The volcano is hot.' }, { emoji: '🌲', word: 'forest', example: 'The forest is deep.' }, { emoji: '🍂', word: 'leaf', example: 'The leaf is brown.' }, { emoji: '🌻', word: 'sunflower', example: 'The sunflower is yellow.' }, { emoji: '🌹', word: 'rose', example: 'The rose is red.' }, { emoji: '🦋', word: 'butterfly', example: 'The butterfly is nice.' }, { emoji: '🐝', word: 'bee', example: 'The bee is small.' }, { emoji: '🐞', word: 'ladybug', example: 'The ladybug is red.' }, { emoji: '🐢', word: 'turtle', example: 'The turtle is slow.' }, { emoji: '🐟', word: 'fish', example: 'The fish can swim.' }, { emoji: '🦁', word: 'lion', example: 'The lion is strong.' }, { emoji: '🐘', word: 'elephant', example: 'The elephant is big.' }, { emoji: '🐒', word: 'monkey', example: 'The monkey is funny.' }, { emoji: '🦓', word: 'zebra', example: 'The zebra has stripes.' }, { emoji: '🦒', word: 'giraffe', example: 'The giraffe is tall.' }, { emoji: '🐫', word: 'camel', example: 'The camel is big.' }, { emoji: '🦘', word: 'kangaroo', example: 'The kangaroo can jump.' }, { emoji: '🌵', word: 'cactus', example: 'The cactus is prickly.' }, { emoji: '🏜️', word: 'desert', example: 'The desert is hot.' }, { emoji: '🌈', word: 'rainbow', example: 'The rainbow is pretty.' }, { emoji: '⚡', word: 'lightning', example: 'The lightning is bright.' }, { emoji: '🌪️', word: 'tornado', example: 'The tornado is scary.' }, { emoji: '🌤️', word: 'weather', example: 'The weather is good.' }, { emoji: '🕒', word: 'hour', example: 'Wait one hour.' }, { emoji: '📆', word: 'week', example: 'One week has days.' }, { emoji: '🗓️', word: 'month', example: 'One month is long.' }, { emoji: '🎄', word: 'winter', example: 'Winter is cold.' }, { emoji: '🌸', word: 'spring', example: 'Spring is nice.' }, { emoji: '☀️', word: 'summer', example: 'Summer is hot.' }, { emoji: '🍁', word: 'autumn', example: 'Autumn is beautiful.' }, { emoji: '🌅', word: 'sunrise', example: 'The sunrise is early.' }, { emoji: '🌃', word: 'night sky', example: 'The night sky is dark.' }, { emoji: '🌍', word: 'earth', example: 'The earth is home.' }
  ]
};

const GRAMMAR_DB = [
  { topic: "Verb To Be", exp: "Used for identity: I am, You are, He/She/It is.", ex: "I am a student. She is happy.", q: "I ___ a student.", options: ["am", "is", "are"], answer: "am" },
  { topic: "Simple Present", exp: "Used for routines: I work, She works.", ex: "I eat rice. She studies.", q: "She (eat) ___ rice.", options: ["eats", "eat", "eating"], answer: "eats" },
  { topic: "Articles", exp: "A for consonant, An for vowel.", ex: "An apple, a cat.", q: "This is ___ orange.", options: ["a", "an", "the"], answer: "an" },
  { topic: "Can / Can't", exp: "Used for abilities.", ex: "I can swim.", q: "I ___ (can) run fast.", options: ["can", "cant", "could"], answer: "can" },
  { topic: "There is / There are", exp: "Used for existence.", ex: "There is a table.", q: "___ two chairs.", options: ["There is", "There are", "They are"], answer: "There are" }
];

const WRITING_POOL = [
  { type: 'fill', prompt: "I ___ happy.", answer: "am" },
  { type: 'fill', prompt: "She ___ a student.", answer: "is" },
  { type: 'fill', prompt: "They ___ my friends.", answer: "are" },
  { type: 'fill', prompt: "We ___ at home.", answer: "are" },
  { type: 'complete', prompt: "She likes ___.", answer: "apples" },
  { type: 'complete', prompt: "I go to ___.", answer: "school" },
  { type: 'complete', prompt: "The sun is ___.", answer: "hot" },
  { type: 'unscramble', prompt: "school / go / I / to", answer: "i go to school" },
  { type: 'unscramble', prompt: "happy / is / she", answer: "she is happy" },
  { type: 'unscramble', prompt: "friends / they / are", answer: "they are friends" },
  { type: 'unscramble', prompt: "dog / small / my / is", answer: "my dog is small" },
  { type: 'correct', prompt: "He are happy.", answer: "he is happy" },
  { type: 'correct', prompt: "She eat rice.", answer: "she eats rice" },
  { type: 'correct', prompt: "I is a teacher.", answer: "i am a teacher" },
  { type: 'short', prompt: "What is your favorite color?", answer: "any" }
];

const READING_POOL = [
  { title: "At School", passage: "I go to school at 8 AM. My classroom is big. My teacher is nice. I study English.", q: "What time do I go to school?", options: ["8 AM", "9 AM", "7 AM"], answer: "8 AM" },
  { title: "My Hobby", passage: "I like video games. I play games after school. It is fun. My brother plays with me.", q: "Who plays games with me?", options: ["My brother", "My teacher", "My mother"], answer: "My brother" },
  { title: "My Pet", passage: "I have a small dog. His name is Rex. Rex likes to run. He is my best friend.", q: "What is the dog's name?", options: ["Rex", "Max", "Rexy"], answer: "Rex" },
  { title: "The Weather", passage: "It is a sunny day. I go to the park. The grass is green. I am happy.", q: "How is the weather?", options: ["Sunny", "Rainy", "Cold"], answer: "Sunny" },
  { title: "Healthy Food", passage: "I eat apples and bananas. Fruits are healthy. I drink water. I do not drink soda.", q: "What do I drink?", options: ["Water", "Soda", "Milk"], answer: "Water" },
  { title: "Shopping Trip", passage: "I go to the store. I buy bread, milk, and cheese. The store is near my house.", q: "What do I buy?", options: ["Bread, milk, and cheese", "Toys", "Cars"], answer: "Bread, milk, and cheese" },
  { title: "Favorite Restaurant", passage: "I go to a pizza restaurant. I order a pepperoni pizza. It is very delicious.", q: "What do I order?", options: ["Pepperoni pizza", "Salad", "Soup"], answer: "Pepperoni pizza" },
  { title: "Daily Routine", passage: "I wake up at 7. I brush my teeth. I eat breakfast. I go to work.", q: "What do I do after I wake up?", options: ["Brush my teeth", "Go to work", "Sleep"], answer: "Brush my teeth" },
  { title: "Transportation", passage: "I take the bus to work. The bus is red. It is usually on time.", q: "What color is the bus?", options: ["Red", "Blue", "Yellow"], answer: "Red" },
  { title: "My Friend", passage: "My friend is Sarah. She has blonde hair. She likes to read books. She is smart.", q: "What does Sarah like?", options: ["Read books", "Play sports", "Dance"], answer: "Read books" },
  { title: "Playing Sports", passage: "I play soccer every Saturday. My team is good. We win many games.", q: "When do I play soccer?", options: ["Every Saturday", "Every Sunday", "Every day"], answer: "Every Saturday" },
  { title: "Watching Movies", passage: "I watch a movie on Friday. It is an action movie. It has big explosions.", q: "When do I watch a movie?", options: ["Friday", "Monday", "Sunday"], answer: "Friday" },
  { title: "Video Games", passage: "I play a new game. It is a racing game. I am very fast. I win first place.", q: "What kind of game is it?", options: ["Racing", "Puzzle", "Strategy"], answer: "Racing" },
  { title: "My Cat", passage: "My cat is white. She likes to sleep on the sofa. She is very quiet.", q: "Where does the cat sleep?", options: ["On the sofa", "On the bed", "On the floor"], answer: "On the sofa" },
  { title: "Technology", passage: "I use my computer to study. I do my homework online. It is very helpful.", q: "What do I use to study?", options: ["Computer", "Book", "Phone"], answer: "Computer" },
  { title: "Feeling Healthy", passage: "I exercise every morning. I feel strong. I eat healthy food too.", q: "When do I exercise?", options: ["Every morning", "Every night", "Every afternoon"], answer: "Every morning" },
  { title: "New Clothes", passage: "I buy a new blue shirt. It fits well. I wear it to the party.", q: "What color is the shirt?", options: ["Blue", "Red", "Green"], answer: "Blue" },
  { title: "The Seasons", passage: "I like winter. It is cold and I can play in the snow. It is beautiful.", q: "What season do I like?", options: ["Winter", "Summer", "Autumn"], answer: "Winter" },
  { title: "In Nature", passage: "I walk in the forest. I see big trees and birds. It is quiet.", q: "Where do I walk?", options: ["Forest", "City", "Store"], answer: "Forest" },
  { title: "My Job", passage: "I am a teacher. I help students learn English. I love my job.", q: "What is my job?", options: ["Teacher", "Doctor", "Driver"], answer: "Teacher" },
  { title: "Emotions", passage: "Today I am excited. It is my birthday. I will have a big cake.", q: "Why am I excited?", options: ["Birthday", "Test", "Party"], answer: "Birthday" },
  { title: "Vacation Time", passage: "I am at the beach. The water is warm. I sit on the sand.", q: "Where am I?", options: ["Beach", "Mountain", "School"], answer: "Beach" },
  { title: "Directions", passage: "Go straight, then turn left. The bank is on the right. You cannot miss it.", q: "Where is the bank?", options: ["On the right", "On the left", "Straight"], answer: "On the right" },
  { title: "Social Media", passage: "I post a photo on Instagram. My friends like it. I feel happy.", q: "Where do I post a photo?", options: ["Instagram", "Facebook", "Twitter"], answer: "Instagram" },
  { title: "Birthday Party", passage: "It is my birthday today. I have five gifts. One is a bicycle.", q: "What is one of the gifts?", options: ["Bicycle", "Car", "Book"], answer: "Bicycle" }
];

const getRandomReadingSet = () => {
  return [...READING_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
};

const LISTENING_DB = [
  { text: "She likes apples.", answer: "She likes apples." },
  { text: "I go to school.", answer: "I go to school." },
  { text: "The weather is good.", answer: "The weather is good." },
  { text: "My mother is nice.", answer: "My mother is nice." },
  { text: "I am very happy.", answer: "I am very happy." }
];

const GRAMMAR_BANK = {
  "Verb To Be": { exp: "Used for identity: I am, You are, He/She/It is.", examples: ["I am a student.", "She is happy."], questions: [{ q: "I ___ a student.", options: ["am", "is", "are"], answer: "am" }, { q: "She ___ happy.", options: ["am", "is", "are"], answer: "is" }, { q: "They ___ my friends.", options: ["am", "is", "are"], answer: "are" }, { q: "We ___ at home.", options: ["am", "is", "are"], answer: "are" }, { q: "It ___ a cat.", options: ["am", "is", "are"], answer: "is" }, { q: "You ___ nice.", options: ["am", "is", "are"], answer: "are" }, { q: "He ___ a boy.", options: ["am", "is", "are"], answer: "is" }] },
  "Subject Pronouns": { exp: "Replaces names: I, You, He, She, It, We, They.", examples: ["I like food.", "They are happy."], questions: [{ q: "___ (John) is a teacher.", options: ["He", "She", "It"], answer: "He" }, { q: "___ (Mary) is nice.", options: ["He", "She", "It"], answer: "She" }, { q: "___ (The dog) is small.", options: ["He", "She", "It"], answer: "It" }, { q: "___ (John and I) are friends.", options: ["We", "They", "You"], answer: "We" }, { q: "___ (The students) are smart.", options: ["They", "He", "She"], answer: "They" }] },
  "Simple Present": { exp: "Used for routines: I work, She works.", examples: ["I eat rice.", "She studies."], questions: [{ q: "She (eat) ___ rice.", options: ["eats", "eat", "eating"], answer: "eats" }, { q: "I (work) ___ here.", options: ["work", "works", "working"], answer: "work" }, { q: "He (play) ___ soccer.", options: ["play", "plays", "playing"], answer: "plays" }, { q: "They (go) ___ home.", options: ["go", "goes", "going"], answer: "go" }, { q: "It (run) ___ fast.", options: ["run", "runs", "running"], answer: "runs" }] },
  "Basic Verbs": { exp: "Essential actions: eat, drink, go, play, like.", examples: ["I eat pizza.", "I play music."], questions: [{ q: "I ___ water every day.", options: ["drink", "eat", "play"], answer: "drink" }, { q: "She ___ apples.", options: ["likes", "like", "liking"], answer: "likes" }, { q: "They ___ to school.", options: ["go", "goes", "going"], answer: "go" }, { q: "We ___ music.", options: ["listen", "listens", "listening"], answer: "listen" }, { q: "He ___ TV.", options: ["watches", "watch", "watching"], answer: "watches" }] },
  "Articles": { exp: "A for consonant, An for vowel.", examples: ["An apple.", "A cat."], questions: [{ q: "This is ___ orange.", options: ["a", "an", "the"], answer: "an" }, { q: "I have ___ dog.", options: ["a", "an", "the"], answer: "a" }, { q: "It is ___ elephant.", options: ["a", "an", "the"], answer: "an" }, { q: "She is ___ teacher.", options: ["a", "an", "the"], answer: "a" }, { q: "I read ___ book.", options: ["a", "an", "the"], answer: "a" }] },
  "Singular & Plural": { exp: "Most nouns take -s in plural.", examples: ["One cat, two cats."], questions: [{ q: "One cat, two ___.", options: ["cats", "cat", "caties"], answer: "cats" }, { q: "One boy, two ___.", options: ["boys", "boy", "boyes"], answer: "boys" }, { q: "One dog, two ___.", options: ["dogs", "dog", "doges"], answer: "dogs" }, { q: "One tree, many ___.", options: ["trees", "tree", "treies"], answer: "trees" }, { q: "One book, two ___.", options: ["books", "book", "bookes"], answer: "books" }] },
  "Possessive Adjectives": { exp: "My, Your, His, Her, Its, Our, Their.", examples: ["My car.", "Your house."], questions: [{ q: "I have a cat. ___ cat is small.", options: ["My", "Your", "His"], answer: "My" }, { q: "She has a book. ___ book is new.", options: ["Her", "His", "Their"], answer: "Her" }, { q: "He has a car. ___ car is red.", options: ["His", "Her", "Its"], answer: "His" }, { q: "We have a house. ___ house is big.", options: ["Our", "Their", "My"], answer: "Our" }, { q: "They have a toy. ___ toy is blue.", options: ["Their", "Our", "My"], answer: "Their" }] },
  "There is / There are": { exp: "Existence: Is for singular, Are for plural.", examples: ["There is a desk.", "There are chairs."], questions: [{ q: "___ a cat here.", options: ["There is", "There are", "They are"], answer: "There is" }, { q: "___ three dogs.", options: ["There is", "There are", "They are"], answer: "There are" }, { q: "___ a student.", options: ["There is", "There are", "They are"], answer: "There is" }, { q: "___ many books.", options: ["There is", "There are", "They are"], answer: "There are" }, { q: "___ an apple.", options: ["There is", "There are", "They are"], answer: "There is" }] },
  "Basic Prepositions": { exp: "In, On, At, To.", examples: ["In the box.", "At home."], questions: [{ q: "I am ___ home.", options: ["at", "in", "on"], answer: "at" }, { q: "The book is ___ the table.", options: ["on", "at", "in"], answer: "on" }, { q: "She is ___ the car.", options: ["in", "at", "on"], answer: "in" }, { q: "I go ___ school.", options: ["to", "at", "on"], answer: "to" }, { q: "The bird is ___ the tree.", options: ["in", "on", "at"], answer: "in" }] },
  "Present Continuous": { exp: "Doing now: I am working.", examples: ["I am eating.", "She is running."], questions: [{ q: "I ___ (eat) now.", options: ["am eating", "eat", "eats"], answer: "am eating" }, { q: "She ___ (run) now.", options: ["is running", "run", "runs"], answer: "is running" }, { q: "They ___ (play) now.", options: ["are playing", "play", "plays"], answer: "are playing" }, { q: "He ___ (sleep).", options: ["is sleeping", "sleep", "sleeps"], answer: "is sleeping" }, { q: "We ___ (work).", options: ["are working", "work", "works"], answer: "are working" }] },
  "Can / Can’t": { exp: "Abilities.", examples: ["I can swim.", "I can't fly."], questions: [{ q: "I ___ (can) swim.", options: ["can", "cant", "is can"], answer: "can" }, { q: "She ___ (not can) fly.", options: ["cannot", "can", "is can"], answer: "cannot" }, { q: "___ you read?", options: ["Can", "Are", "Do"], answer: "Can" }, { q: "He ___ sing well.", options: ["can", "cant", "is"], answer: "can" }, { q: "They ___ speak English.", options: ["can", "cant", "are"], answer: "can" }] },
  "Questions": { exp: "Who, What, Where, When.", examples: ["What is your name?", "Where are you?"], questions: [{ q: "___ is your name?", options: ["What", "Where", "Who"], answer: "What" }, { q: "___ are you from?", options: ["Where", "What", "When"], answer: "Where" }, { q: "___ is that?", options: ["Who", "What", "When"], answer: "Who" }, { q: "___ is your birthday?", options: ["When", "Who", "Where"], answer: "When" }, { q: "___ do you live?", options: ["Where", "What", "Who"], answer: "Where" }] },
  "Basic Negatives": { exp: "Do not (don't), Does not (doesn't).", examples: ["I don't like it.", "She doesn't eat."], questions: [{ q: "I ___ like it.", options: ["don't", "doesn't", "not"], answer: "don't" }, { q: "She ___ like it.", options: ["doesn't", "don't", "not"], answer: "doesn't" }, { q: "He ___ want pizza.", options: ["doesn't", "don't", "not"], answer: "doesn't" }, { q: "We ___ know.", options: ["don't", "doesn't", "not"], answer: "don't" }, { q: "It ___ work.", options: ["doesn't", "don't", "not"], answer: "doesn't" }] },
  "Adjectives": { exp: "Descriptors: big, small, happy, sad.", examples: ["A big car.", "A happy cat."], questions: [{ q: "The house is ___.", options: ["big", "run", "eat"], answer: "big" }, { q: "She is ___.", options: ["happy", "eat", "play"], answer: "happy" }, { q: "The apple is ___.", options: ["red", "walk", "go"], answer: "red" }, { q: "My cat is ___.", options: ["small", "work", "run"], answer: "small" }, { q: "This is a ___ movie.", options: ["good", "walk", "eat"], answer: "good" }] },
  "Basic Past Introduction": { exp: "Was, Were.", examples: ["I was there.", "They were happy."], questions: [{ q: "I ___ there yesterday.", options: ["was", "were", "are"], answer: "was" }, { q: "They ___ at school.", options: ["were", "was", "are"], answer: "were" }, { q: "She ___ happy.", options: ["was", "were", "are"], answer: "was" }, { q: "We ___ busy.", options: ["were", "was", "are"], answer: "were" }, { q: "It ___ cold.", options: ["was", "were", "are"], answer: "was" }] }
};

// --- AI API HELPER ---
const getLocalTutorResponse = (message = '') => {
  const text = message.toLowerCase();

  if (text.includes('verb') || text.includes('action')) {
    return "Verbs are action words 😊\n\nThey show what a person or thing does.\n\nExamples:\n• eat\n• go\n• play\n• study\n\nExample sentence:\nI study English.";
  }

  if (text.includes('to be') || text.includes(' am ') || text.includes(' is ') || text.includes(' are ')) {
    return "Great question! We use the verb to be to say who someone is, how someone feels, or where someone is.\n\nUse:\n• I am\n• He / She / It is\n• You / We / They are\n\nExamples:\nI am happy.\nShe is a student.\nThey are at home.";
  }

  if (text.includes('a ') || text.includes('an ') || text.includes('article')) {
    return "Use a before words that start with a consonant sound.\nUse an before words that start with a vowel sound.\n\nExamples:\n• a dog\n• a book\n• an apple\n• an orange";
  }

  if (text.includes('correct') || text.includes('sentence')) {
    return "Sure 😊 Write your sentence and I can help you correct it.\n\nI will keep the explanation simple and beginner-friendly.";
  }

  if (text.includes('hello') || text.includes('hi')) {
    return "Hi! 😊 I’m happy to help you practice English today.\n\nYou can ask me about vocabulary, grammar, pronunciation, or writing.";
  }

  return "Good question 😊\n\nI can help you with that in simple English. Try asking me about a word, a sentence, or a grammar topic.\n\nExample:\nWhat does apple mean?\nWhen do I use is?\nCan you correct my sentence?";
};

// Optional Gemini helper. Add your API key only if you deploy with a safe backend/proxy.
// The app works without an API key by using the local tutor fallback above.
const callGemini = async (prompt) => {
  const GEMINI_API_KEY = '';

  if (!GEMINI_API_KEY) {
    return getLocalTutorResponse(prompt);
  }

  const payload = {
    contents: [{ parts: [{ text: `You are a friendly English teacher for A1 learners. Do not use markdown symbols like ** or ##. Use short paragraphs, simple bullets with •, and easy examples. Student message: ${prompt}` }] }],
  };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || getLocalTutorResponse(prompt);
  } catch (err) {
    return getLocalTutorResponse(prompt);
  }
};

const SPEAKING_DB = [
  { text: "Hello, how are you?" },
  { text: "What is your name?" },
  { text: "I like learning English." },
  { text: "My favorite food is pizza." },
  { text: "It is a sunny day." }
];

const getRandomItems = (array, count) => [...array].sort(() => Math.random() - 0.5).slice(0, count);

// --- MAIN APPLICATION ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // --- SPEAKING PAGE FIX ---
  const SpeakingPage = () => {
    const [sentences, setSentences] = useState([]);
    const [index, setIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [finished, setFinished] = useState(false);

    const generateSet = useCallback(() => {
      const subjects = ["My dog", "We", "I", "She", "They", "He", "The book", "My teacher", "The cat", "The classroom", "My friend"];
      const predicates = ["is small", "go to school", "have a blue bag", "likes apples", "are at home", "drinks water", "is on the table", "is nice", "is under the chair", "is big", "wants pizza"];
      
      const newSet = [];
      while (newSet.length < 5) {
        const s = subjects[Math.floor(Math.random() * subjects.length)];
        const p = predicates[Math.floor(Math.random() * predicates.length)];
        const sentence = `${s} ${p}.`;
        if (!newSet.includes(sentence)) newSet.push(sentence);
      }
      setSentences(newSet);
      setIndex(0);
      setFeedback(null);
      setTranscript('');
      setFinished(false);
    }, []);

    useEffect(generateSet, [generateSet]);

    const startSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition not supported.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        
        // Basic fuzzy matching for Latin accent tolerance
        const target = sentences[index].toLowerCase().replace(/[.?!]/g, "");
        const input = result.toLowerCase().replace(/[.?!]/g, "");
        
        const wordsMatch = input.split(' ').filter(w => target.includes(w)).length / target.split(' ').length;
        setFeedback(wordsMatch >= 0.4 ? 'correct' : 'incorrect');
      };
      recognition.start();
    };

    if (finished) {
      return (
        <div className="p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Speaking Set Finished!</h2>
            <button onClick={generateSet} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold">Generate New Speaking Set</button>
        </div>
      );
    }

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 capitalize">Speaking</h2>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <div className="space-y-4 text-center">
                <p className="text-xl">Say: <span className="font-bold">"{sentences[index]}"</span></p>
                <button onClick={startSpeechRecognition} className={`p-6 rounded-full ${isListening ? 'bg-red-500' : 'bg-rose-500'} text-white transition`}><Mic /></button>
                <p className="text-stone-500 italic min-h-[1.5rem]">{transcript}</p>
                {feedback && <div className={`p-4 rounded-xl ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{feedback === 'correct' ? '✅ Correct!' : '❌ Try again.'}</div>}
            </div>
            <div className="flex justify-between mt-8">
                <button onClick={() => { setIndex(i => Math.min(4, i + 1)); setFeedback(null); setTranscript(''); if(index === 4) setFinished(true); }} className="px-6 py-2 bg-stone-900 text-white rounded-xl">Next</button>
            </div>
        </div>
      </div>
    );
  };

  // --- SUB COMPONENTS (PAGES) ---

  const Sidebar = () => (
    <aside className="w-64 bg-white border-r p-6 h-screen flex flex-col shadow-sm">
      <h1 className="text-2xl font-bold text-rose-600 mb-10 flex items-center gap-2"><BrainCircuit /> BLOOM</h1>
      <nav className="space-y-2 flex-1">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'vocabulary', label: 'Vocabulary', icon: Languages },
          { id: 'lab', label: 'Lab', icon: Zap },
          { id: 'grammar', label: 'Grammar', icon: Book },
          { id: 'reading', label: 'Reading', icon: BookText },
          { id: 'writing', label: 'Writing', icon: Pencil },
          { id: 'listening', label: 'Listening', icon: Headphones },
          { id: 'speaking', label: 'Speaking', icon: Mic },
          { id: 'aitutor', label: 'AI Tutor', icon: MessageCircle },
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium ${activeSection === item.id ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50'}`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );

  const AITutorPage = () => {
    const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am your AI English tutor. How are you today?' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
      if (!input.trim()) return;
      const newMessages = [...messages, { role: 'user', text: input }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);
      const aiResponse = await callGemini(`The student said: "${input}". Reply to them as a supportive A1 English tutor.`);
      setMessages([...newMessages, { role: 'ai', text: aiResponse }]);
      setLoading(false);
    };

    return (
      <div className="p-8 max-w-2xl mx-auto h-screen flex flex-col">
        <h2 className="text-2xl font-bold mb-6">AI English Tutor</h2>
        <div className="flex-1 bg-white border rounded-3xl p-6 overflow-y-auto mb-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-4 rounded-2xl ${m.role === 'ai' ? 'bg-rose-50 text-rose-900 mr-auto' : 'bg-stone-900 text-white ml-auto'} max-w-[80%]`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="text-stone-500 italic">Tutor is thinking...</div>}
        </div>
        <div className="flex gap-2">
            <input 
                className="flex-1 p-4 border rounded-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about English..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-rose-500 text-white px-6 rounded-xl font-bold">Send</button>
        </div>
      </div>
    );
  };

  const HomeView = () => {
    const quotes = ["Great job today!", "You’re improving!", "Keep practicing!", "Small steps every day!", "You are doing great!", "Practice makes progress!"];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Mini Study Timer State
    const [timer, setTimer] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    // Lofi Mode State
    const [isLofiPlaying, setIsLofiPlaying] = useState(false);
    const [isRainOn, setIsRainOn] = useState(false);
    const rainRef = useRef(null);
    const lofiRef = useRef(null);
    const audioCtxRef = useRef(null);

    useEffect(() => {
      if (isActive && timer > 0) {
        intervalRef.current = setInterval(() => setTimer(t => t - 1), 1000);
      } else {
        clearInterval(intervalRef.current);
      }
      return () => clearInterval(intervalRef.current);
    }, [isActive, timer]);

    // Lofi Logic
    useEffect(() => {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;

      if (isLofiPlaying) {
        // Simple Lofi Synth: Kick + Snare + Low Pass
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.2;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800; // Muffled lofi sound
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        let step = 0;
        const playBeat = () => {
          if (!isLofiPlaying) return;
          const time = ctx.currentTime;
          // Kick
          if (step % 4 === 0) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(150, time);
            osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);
            gain.gain.setValueAtTime(0.5, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            osc.connect(gain);
            gain.connect(filter);
            osc.start();
            osc.stop(time + 0.1);
          }
          // Snare
          if (step % 4 === 2) {
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for(let i=0; i<data.length; i++) data[i] = Math.random() * 2 - 1;
            const src = ctx.createBufferSource();
            src.buffer = buffer;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            src.connect(gain);
            gain.connect(filter);
            src.start();
          }
          step++;
          lofiRef.current = setTimeout(playBeat, 500);
        };
        playBeat();
      } else if (lofiRef.current) {
        clearTimeout(lofiRef.current);
        lofiRef.current = null;
      }
      return () => { if (lofiRef.current) clearTimeout(lofiRef.current); };
    }, [isLofiPlaying]);

    // Rain Logic
    useEffect(() => {
        if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const ctx = audioCtxRef.current;
        
        if (isRainOn) {
            const bufferSize = 2 * ctx.sampleRate;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            
            const gainNode = ctx.createGain();
            gainNode.gain.value = 0.15;
            
            source.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            source.start();
            rainRef.current = { source, gainNode };
        } else if (rainRef.current) {
            rainRef.current.source.stop();
            rainRef.current = null;
        }
    }, [isRainOn]);

    const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    // Today's Goals State
    const [goals, setGoals] = useState([
      { id: 1, text: 'Complete 1 Grammar Topic', checked: false },
      { id: 2, text: 'Learn 5 New Words', checked: false },
      { id: 3, text: 'Finish 1 Listening Set', checked: false },
      { id: 4, text: 'Complete 1 Speaking Session', checked: false },
    ]);

    const toggleGoal = (id) => {
      setGoals(prev => prev.map(g => g.id === id ? { ...g, checked: !g.checked } : g));
    };

    const progress = Math.round((goals.filter(g => g.checked).length / goals.length) * 100);

    return (
      <div className="p-8 space-y-8">
        <header className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
          <h2 className="text-3xl font-bold text-stone-800">Welcome Back, Learner</h2>
          <p className="text-stone-500 mt-2">Ready to grow your English skills today?</p>
        </header>
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm">
          <h3 className="text-lg font-bold text-rose-600 mb-1">Motivational Quotes</h3>
          <p className="text-stone-600 italic">"{quote}"</p>
        </div>

        {/* Mini Study Timer */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm">
          <h3 className="text-lg font-bold text-rose-600 mb-3">Mini Study Timer</h3>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-stone-700 mb-4">
              {timer === 0 ? "Great job! Time for a short break ☕" : formatTime(timer)}
            </div>
            <div className="flex gap-2 justify-center flex-wrap mb-4">
              <button onClick={() => { setIsActive(true); setIsLofiPlaying(true); }} className="text-xs px-3 py-2 bg-rose-500 text-white rounded-lg font-medium">▶ Start Focus Session</button>
              <button onClick={() => { setIsActive(false); setIsLofiPlaying(false); }} className="text-xs px-3 py-2 bg-stone-200 text-stone-700 rounded-lg font-medium">⏸ Pause</button>
              <button onClick={() => { setIsActive(false); setIsLofiPlaying(false); setTimer(25 * 60); }} className="text-xs px-3 py-2 bg-stone-200 text-stone-700 rounded-lg font-medium">🔄 Reset</button>
            </div>
            
            {/* Lofi Study Mode */}
            <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wider">Lofi Study Mode</p>
                <div className="flex gap-2 justify-center">
                    <button onClick={() => setIsLofiPlaying(!isLofiPlaying)} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition ${isLofiPlaying ? 'bg-rose-100 text-rose-700' : 'bg-stone-100'}`}>
                        🎵 {isLofiPlaying ? 'Stop Lofi' : 'Play Lofi'}
                    </button>
                    <button onClick={() => setIsRainOn(!isRainOn)} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition ${isRainOn ? 'bg-sky-100 text-sky-700' : 'bg-stone-100'}`}>
                        🌧 Rain: {isRainOn ? 'On' : 'Off'}
                    </button>
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-500 text-white p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-2">Daily Challenge</h3>
              <p className="opacity-90">Complete 5 grammar exercises.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border">
              <h3 className="text-xl font-bold mb-2">Streak</h3>
              <p className="text-4xl font-black text-rose-500">12 Days</p>
          </div>
        </div>

        {/* Today's Goals Card */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm">
          <h3 className="text-lg font-bold text-rose-600 mb-4">Today’s Goals</h3>
          <div className="space-y-3">
            {goals.map(goal => (
              <button 
                key={goal.id} 
                onClick={() => toggleGoal(goal.id)}
                className="flex items-center gap-3 w-full text-left"
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${goal.checked ? 'bg-rose-500 border-rose-500' : 'border-stone-300'}`}>
                  {goal.checked && <Check size={14} className="text-white" />}
                </div>
                <span className={`text-stone-700 ${goal.checked ? 'line-through text-stone-400' : ''}`}>{goal.text}</span>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm text-stone-500 mb-2">
              <span>Progress</span>
              <span>{progress}% completed</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2">
              <div className="bg-rose-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VocabularyPage = () => {
    const categories = useMemo(() => Object.keys(VOCAB_DATA), []);
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleNext = () => setCurrentIdx(prev => Math.min(prev + 1, categories.length - 1));
    const handlePrev = () => setCurrentIdx(prev => Math.max(prev - 1, 0));

    const activeCat = categories[currentIdx];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-stone-50 disabled:opacity-50"
                >
                    <ArrowLeft size={16} /> Previous Topic
                </button>
                <h2 className="text-2xl font-bold text-rose-600">{activeCat}</h2>
                <button 
                    onClick={handleNext}
                    disabled={currentIdx === categories.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-stone-50 disabled:opacity-50"
                >
                    Next Topic <ArrowRight size={16} />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VOCAB_DATA[activeCat].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-white border rounded-xl shadow-sm">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                            <p className="font-bold text-lg">{item.word}</p>
                            <p className="text-sm text-stone-500 italic">Example: {item.example}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const LabPage = () => {
    const [tab, setTab] = useState('flashcards');
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState(new Set());
    
    // Quiz State
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); 
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, " ");

    useEffect(() => {
        setCards(getRandomItems(Object.values(VOCAB_DATA).flat(), 6));
    }, []);

    const toggleFlip = (index) => {
        setFlippedCards(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const generateQuiz = () => {
        const allWords = Object.values(VOCAB_DATA).flat();
        
        const newQuestions = [];
        const questionTypes = ['vocab', 'grammar', 'truefalse', 'unscramble'];
        
        for (let i = 0; i < 10; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'vocab') {
                const correct = allWords[Math.floor(Math.random() * allWords.length)];
                const options = [correct.word];
                while(options.length < 3) {
                    const wrong = allWords[Math.floor(Math.random() * allWords.length)].word;
                    if(!options.includes(wrong)) options.push(wrong);
                }
                newQuestions.push({
                    type: 'multiple',
                    question: `What is this? ${correct.emoji}`,
                    options: shuffleArray(options),
                    answer: correct.word
                });
            } else if (type === 'grammar') {
                const g = GRAMMAR_DB[Math.floor(Math.random() * GRAMMAR_DB.length)];
                newQuestions.push({
                    type: 'multiple',
                    question: g.q.replace('___', '...'),
                    options: g.options,
                    answer: g.answer
                });
            } else if (type === 'truefalse') {
                const wordObj = allWords[Math.floor(Math.random() * allWords.length)];
                newQuestions.push({
                    type: 'multiple',
                    question: `True or False: "${wordObj.word}" is an English word.`,
                    options: ["True", "False"],
                    answer: "True"
                });
            } else {
                // Unscramble
                const sentList = ["i go to school", "she is happy", "they are friends", "my dog is small", "she likes apples", "we drink milk"];
                const sent = sentList[Math.floor(Math.random() * sentList.length)];
                const words = sent.split(' ');
                const scrambled = shuffleArray(words).join(' / ');
                newQuestions.push({
                    type: 'input',
                    question: `Unscramble: "${scrambled}"`,
                    answer: sent
                });
            }
        }
        setQuestions(newQuestions);
        setQuizStarted(true);
        setQuizFinished(false);
        setCurrentIdx(0);
        setScore(0);
        setFeedback(null);
        setSelectedAnswer('');
    };

    const handleAnswer = (ans) => {
        if(feedback) return;
        setSelectedAnswer(ans);
        
        const currentQ = questions[currentIdx];
        const isCorrect = currentQ.type === 'input' 
            ? normalize(ans) === normalize(currentQ.answer)
            : ans === currentQ.answer;

        setFeedback(isCorrect ? 'correct' : 'incorrect');
        if(isCorrect) setScore(s => s + 1);
    };

    const nextQuestion = () => {
        if(currentIdx < questions.length - 1) {
            setCurrentIdx(i => i + 1);
            setFeedback(null);
            setSelectedAnswer('');
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="p-8">
            <div className="flex gap-4 mb-8">
                <button onClick={() => setTab('flashcards')} className={`px-6 py-2 rounded-full ${tab === 'flashcards' ? 'bg-rose-500 text-white' : 'bg-white border'}`}>Flashcards</button>
                <button onClick={() => setTab('quiz')} className={`px-6 py-2 rounded-full ${tab === 'quiz' ? 'bg-rose-500 text-white' : 'bg-white border'}`}>Quiz Generator</button>
            </div>
            
            {tab === 'flashcards' ? (
                <div className="space-y-6">
                    <button onClick={() => setCards(getRandomItems(Object.values(VOCAB_DATA).flat(), 6))} className="flex items-center gap-2 text-rose-500"><RefreshCw size={16}/> New Set</button>
                    <div className="grid md:grid-cols-3 gap-6">
                        {cards.map((c, i) => (
                            <div 
                                key={i} 
                                onClick={() => toggleFlip(i)}
                                className={`h-48 bg-white border rounded-3xl shadow-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 transform ${flippedCards.has(i) ? 'bg-rose-50' : ''}`}
                            >
                                {flippedCards.has(i) ? (
                                    <span className="text-6xl">{c.emoji}</span>
                                ) : (
                                    <h3 className="text-2xl font-bold text-stone-700">{c.word}</h3>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-3xl border shadow-sm max-w-lg mx-auto">
                    {!quizStarted || quizFinished ? (
                        <div className="text-center">
                            {quizFinished ? (
                                <>
                                    <h3 className="text-2xl font-bold mb-4">Quiz Finished!</h3>
                                    <p className="text-4xl font-bold text-rose-500 mb-6">{score} / 10</p>
                                    <button onClick={generateQuiz} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold">Generate New Quiz</button>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-xl mb-4">Quiz Engine</h3>
                                    <p className="text-stone-500 mb-6">10 random questions generated for you.</p>
                                    <button onClick={generateQuiz} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold">Start 10-Question Quiz</button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm text-stone-500">
                                <span>Question {currentIdx + 1} / 10</span>
                                <span>Score: {score}</span>
                            </div>
                            <h3 className="text-xl font-semibold">{questions[currentIdx].question}</h3>
                            
                            {questions[currentIdx].type === 'multiple' ? (
                                <div className="grid gap-3">
                                    {questions[currentIdx].options.map(o => (
                                        <button 
                                            key={o} 
                                            onClick={() => handleAnswer(o)}
                                            disabled={feedback !== null}
                                            className={`p-4 border rounded-xl text-left transition ${selectedAnswer === o ? (feedback === 'correct' ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500') : 'hover:bg-rose-50'}`}
                                        >
                                            {o}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        className="w-full p-4 border rounded-xl"
                                        placeholder="Type your answer..."
                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                        disabled={feedback !== null}
                                    />
                                    <button onClick={() => handleAnswer(selectedAnswer)} className="bg-rose-500 text-white w-full py-3 rounded-xl">Submit</button>
                                </div>
                            )}

                            {feedback && (
                                <div className={`p-4 rounded-xl text-center ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                    {feedback === 'correct' ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${questions[currentIdx].answer}`}
                                    <button onClick={nextQuestion} className="block w-full mt-4 bg-stone-900 text-white py-2 rounded-lg">Next Question</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
  };

  const WritingPage = () => {
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const generateSet = useCallback(() => {
      const templates = [
        { s: "I", v: "eat", o: "an apple" },
        { s: "She", v: "likes", o: "pizza" },
        { s: "They", v: "go to", o: "school" },
        { s: "He", v: "is", o: "happy" },
        { s: "We", v: "are", o: "tired" },
        { s: "My friend", v: "drinks", o: "water" },
        { s: "The cat", v: "is", o: "small" },
        { s: "You", v: "have", o: "a book" },
        { s: "I", v: "am", o: "a student" },
        { s: "She", v: "works", o: "at home" }
      ];

      const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      const newExercises = Array.from({ length: 5 }, (_, i) => {
        const { s, v, o } = getRandom(templates);
        const sentence = `${s} ${v} ${o}`.trim();
        const type = i % 3; // Cycle through types: fill, unscramble, correct

        if (type === 0) { // Fill in the blank
          const parts = sentence.split(" ");
          const blankIdx = Math.floor(Math.random() * parts.length);
          const answer = parts[blankIdx];
          parts[blankIdx] = "___";
          return { type: 'fill', prompt: parts.join(" "), answer: answer };
        } 
        
        if (type === 1) { // Unscramble
          const words = sentence.split(" ");
          const scrambled = [...words].sort(() => Math.random() - 0.5).join(" / ");
          return { type: 'unscramble', prompt: scrambled, answer: sentence.toLowerCase() };
        }

        // Grammar Fix (The "correct" type)
        // Injecting a simple A1 grammar error into a valid sentence
        let errorPrompt = sentence;
        if (v === "is") errorPrompt = sentence.replace("is", "are");
        else if (v === "are") errorPrompt = sentence.replace("are", "is");
        else if (s === "I" && v === "eat") errorPrompt = "I eats an apple";
        else if (s === "She" && v === "likes") errorPrompt = "She like pizza";
        else if (s === "They" && v === "go to") errorPrompt = "They goes to school";
        else errorPrompt = `${s} ${v === 'is' ? 'are' : 'is'} ${o}`;

        return { type: 'correct', prompt: `${errorPrompt} (Fix the grammar)`, answer: sentence.toLowerCase() };
      });

      setExercises(newExercises.sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setUserInput("");
      setFeedback(null);
      setSubmitted(false);
      setCompleted(false);
    }, []);

    useEffect(generateSet, [generateSet]);

    const normalize = (text) => text.trim().toLowerCase().replace(/[.,!?;]+$/g, "").replace(/\s+/g, " ");

    const handleSubmit = () => {
      if (!exercises[currentIndex]) return;
      const cleanInput = normalize(userInput);
      const cleanAnswer = normalize(exercises[currentIndex].answer);
      const correct = cleanInput === cleanAnswer;
      setFeedback(correct ? "correct" : "incorrect");
      setSubmitted(true);
    };

    if (exercises.length === 0) return <div className="p-8">Loading...</div>;

    if (completed) {
      return (
        <div className="p-8 max-w-lg mx-auto text-center bg-white border rounded-3xl mt-10 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Set Completed!</h3>
          <p className="text-stone-500 mb-6">Great job. Let's keep growing!</p>
          <button onClick={generateSet} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto">
            <RefreshCcw size={20} /> Generate New Writing Set
          </button>
        </div>
      );
    }

    const current = exercises[currentIndex];

    return (
      <div className="p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Writing Exercise {currentIndex + 1} / 5</h2>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <p className="text-lg font-semibold mb-6">{current.prompt}</p>
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-4 border rounded-xl mb-4"
            placeholder="Type your answer here..."
            disabled={submitted}
          />
          {!submitted ? (
            <button onClick={handleSubmit} className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold">Submit</button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 text-center rounded-xl font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {feedback === 'correct' ? "✅ Correct" : `❌ Incorrect. Answer: ${current.answer}`}
              </div>
              
              {feedback === 'incorrect' && (
                <button 
                  onClick={async () => {
                    const advice = await callGemini(`I wrote "${userInput}" but the correct answer is "${current.answer}". Why?`);
                    alert(advice);
                  }}
                  className="w-full bg-rose-100 text-rose-700 py-3 rounded-xl font-bold text-sm"
                >
                  ✨ Ask AI for Feedback
                </button>
              )}

              <div className="flex gap-2">
                {currentIndex < 4 ? (
                  <button onClick={() => { setCurrentIndex(prev => prev + 1); setUserInput(""); setFeedback(null); setSubmitted(false); }} className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold">Next</button>
                ) : (
                  <button onClick={() => setCompleted(true)} className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-bold">Finish Set</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ListeningPage = () => {
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const generateSet = useCallback(() => {
      // Dynamic combinations for A1 level sentences
      const templates = [
        () => {
          const s = ["My dog", "My cat", "The car", "The house", "The classroom", "My bag", "The weather"];
          const adj = ["small", "big", "fast", "nice", "sunny", "blue", "red", "cold", "hot"];
          return `${s[Math.floor(Math.random()*s.length)]} is ${adj[Math.floor(Math.random()*adj.length)]}.`;
        },
        () => {
          const s = ["I", "We", "They", "You"];
          const v = ["want", "have", "like", "need", "eat", "drink"];
          const o = ["pizza", "water", "a book", "apples", "coffee", "milk", "a blue bag"];
          return `${s[Math.floor(Math.random()*s.length)]} ${v[Math.floor(Math.random()*v.length)]} ${o[Math.floor(Math.random()*o.length)]}.`;
        },
        () => {
          const s = ["He", "She", "My friend", "My teacher"];
          const v = ["wants", "has", "likes", "needs", "eats", "drinks"];
          const o = ["pizza", "water", "a book", "apples", "coffee", "milk"];
          return `${s[Math.floor(Math.random()*s.length)]} ${v[Math.floor(Math.random()*v.length)]} ${o[Math.floor(Math.random()*o.length)]}.`;
        },
        () => {
          const s = ["I", "We", "They"];
          const v = ["go to", "are at", "walk to"];
          const loc = ["school", "home", "the park", "the store", "the hospital"];
          return `${s[Math.floor(Math.random()*s.length)]} ${v[Math.floor(Math.random()*v.length)]} ${loc[Math.floor(Math.random()*loc.length)]}.`;
        },
        () => {
          const s = ["The cat", "The dog", "The book", "The pen"];
          const prep = ["under", "on", "next to", "behind"];
          const loc = ["the table", "the chair", "the desk", "the bed"];
          return `${s[Math.floor(Math.random()*s.length)]} is ${prep[Math.floor(Math.random()*prep.length)]} ${loc[Math.floor(Math.random()*loc.length)]}.`;
        }
      ];

      const newExercises = Array.from({ length: 5 }, () => {
          return { text: templates[Math.floor(Math.random() * templates.length)]() };
      });

      setExercises(newExercises);
      setCurrentIndex(0);
      setUserInput("");
      setFeedback(null);
      setSubmitted(false);
      setCompleted(false);
    }, []);

    useEffect(() => {
      generateSet();
    }, [generateSet]);

    const playAudio = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };

    const normalize = (text) => text.trim().toLowerCase().replace(/[.,!?;]+$/g, "").replace(/\s+/g, " ");

    const handleSubmit = () => {
      if (!exercises[currentIndex]) return;
      const cleanInput = normalize(userInput);
      const cleanAnswer = normalize(exercises[currentIndex].text);
      const correct = cleanInput === cleanAnswer;
      setFeedback(correct ? "correct" : "incorrect");
      setSubmitted(true);
    };

    if (exercises.length === 0) return <div className="p-8">Loading...</div>;

    if (completed) {
      return (
        <div className="p-8 max-w-lg mx-auto text-center bg-white border rounded-3xl mt-10 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Set Completed!</h3>
          <p className="text-stone-500 mb-6">Great job. Let's keep practicing your listening skills!</p>
          <button onClick={generateSet} className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto">
            <RefreshCcw size={20} /> Generate New Listening Set
          </button>
        </div>
      );
    }

    const current = exercises[currentIndex];

    return (
      <div className="p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Listening Exercise {currentIndex + 1} / 5</h2>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <div className="space-y-6 text-center">
              <button onClick={() => playAudio(current.text)} className="p-6 bg-rose-500 text-white rounded-full mx-auto block hover:bg-rose-600 transition shadow-md">
                  <Volume2 size={32} />
              </button>
              <p className="text-stone-500 text-sm font-medium">Click to hear the audio</p>
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-4 border rounded-xl mb-4 text-lg text-center"
                placeholder="Type what you hear..."
                disabled={submitted}
              />
          </div>
          
          {!submitted ? (
            <button onClick={handleSubmit} className="w-full mt-6 bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-stone-800 transition">Submit</button>
          ) : (
            <div className="space-y-4 mt-6">
              <div className={`p-4 text-center rounded-xl font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {feedback === 'correct' ? "✅ Correct!" : `❌ Incorrect. The audio said: "${current.text}"`}
              </div>
              
              <div className="flex gap-2">
                {currentIndex < 4 ? (
                  <button onClick={() => { setCurrentIndex(prev => prev + 1); setUserInput(""); setFeedback(null); setSubmitted(false); }} className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition">Next Dictation</button>
                ) : (
                  <button onClick={() => setCompleted(true)} className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition">Finish Set</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GeneratorPage = ({ type, dataSet }) => {
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [localSet, setLocalSet] = useState(dataSet);

    const generateNewSet = () => {
        if (type === 'reading') {
            setLocalSet(getRandomReadingSet());
            setIndex(0);
            setFeedback(null);
            setAnswer('');
        }
    };

    // Normalize utility for flexible comparison
    const normalize = (text) =>
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const current = localSet[index];

    const playAudio = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };

    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setFeedback("Speech recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswer(transcript);
            
            const normT = normalize(transcript);
            const normE = normalize(current.text);
            
            const isMatch = normT === normE || 
                            (normT.length > 2 && normE.length > 2 && normT.replace(/s$/g, "") === normE.replace(/s$/g, ""));
            
            setFeedback(isMatch ? 'correct' : 'incorrect');
        };
        recognition.onerror = (event) => {
            setFeedback(`Recognition error: ${event.error}`);
            setIsListening(false);
        };
        recognition.start();
    };

    const handleAnswer = () => {
        if (type === 'grammar') {
            return; // Grammar handled by internal component state
        } else if (type === 'reading') {
            setFeedback(answer === current.answer ? 'correct' : 'incorrect');
        } else if (type === 'listening') {
            setFeedback(answer.toLowerCase().trim() === current.answer.toLowerCase().trim() ? 'correct' : 'incorrect');
        }
    };

    const renderContent = () => {
        if (type === 'grammar') {
            return <GrammarSection />;
        }
        if (type === 'reading') {
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">{current.title}</h3>
                    <p className="p-4 bg-stone-50 rounded-xl">{current.passage}</p>
                    <p className="font-semibold">{current.q}</p>
                    <div className="grid gap-2">
                        {current.options.map(o => (
                            <button key={o} onClick={() => setAnswer(o)} className={`p-3 border rounded-xl ${answer === o ? 'bg-rose-100' : ''}`}>{o}</button>
                        ))}
                    </div>
                </div>
            );
        }
        if (type === 'listening') {
            return (
                <div className="space-y-4 text-center">
                    <button onClick={() => playAudio(current.text)} className="p-6 bg-rose-500 text-white rounded-full"><Volume2 /></button>
                    <input type="text" onChange={(e) => setAnswer(e.target.value)} value={answer} className="w-full p-4 border rounded-xl" placeholder="Type what you hear..." />
                </div>
            );
        }
        if (type === 'speaking') {
            return (
                <div className="space-y-4 text-center">
                    <p className="text-xl">Say: <span className="font-bold">"{current.text}"</span></p>
                    <button onClick={startSpeechRecognition} className={`p-6 rounded-full ${isListening ? 'bg-red-500' : 'bg-rose-500'} text-white`}><Mic /></button>
                    <p className="text-stone-500">{answer}</p>
                </div>
            );
        }
        return null;
    };

    const GrammarSection = () => {
        const topics = Object.keys(GRAMMAR_BANK);
        const [tIdx, setTIdx] = useState(0);
        const [qIdx, setQIdx] = useState(0);
        const [ans, setAns] = useState('');
        const [fb, setFb] = useState(null);
        const [currentSet, setCurrentSet] = useState([]);

        const topic = topics[tIdx];
        const data = GRAMMAR_BANK[topic];

        useEffect(() => {
            const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
            setCurrentSet(shuffled.slice(0, 5));
            setQIdx(0);
            setAns('');
            setFb(null);
        }, [tIdx, data]);

        const generateMore = () => {
            const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
            setCurrentSet(shuffled.slice(0, 5));
            setQIdx(0);
            setAns('');
            setFb(null);
        };

        const currentQ = currentSet[qIdx];

        const handleNext = () => {
            if (qIdx < currentSet.length - 1) setQIdx(qIdx + 1);
            setFb(null);
            setAns('');
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between mb-4">
                    <button onClick={() => { setTIdx((tIdx - 1 + topics.length) % topics.length); setQIdx(0); }} className="px-4 py-2 bg-stone-100 rounded-xl text-sm">Prev Topic</button>
                    <button onClick={() => { setTIdx((tIdx + 1) % topics.length); setQIdx(0); }} className="px-4 py-2 bg-stone-100 rounded-xl text-sm">Next Topic</button>
                </div>
                <h3 className="text-xl font-bold">{topic}</h3>
                <p className="text-stone-600 italic">{data.exp}</p>
                {currentQ && (
                    <div className="space-y-4">
                        <p className="font-semibold text-lg">{currentQ.q}</p>
                        <div className="grid gap-2">
                            {currentQ.options.map(o => (
                                <button key={o} onClick={() => !fb && setAns(o)} className={`p-3 border rounded-xl ${ans === o ? 'bg-rose-100' : 'hover:bg-rose-50'}`}>{o}</button>
                            ))}
                        </div>
                        {!fb ? (
                            <button onClick={() => setFb(ans === currentQ.answer ? 'correct' : 'incorrect')} className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold">Submit</button>
                        ) : (
                            <div className={`p-4 rounded-xl text-center ${fb === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {fb === 'correct' ? '✅ Correct' : `❌ Incorrect. Answer: ${currentQ.answer}`}
                                {qIdx < 4 && <button onClick={handleNext} className="block w-full mt-4 bg-white/50 py-2 rounded-lg font-bold">Next Question</button>}
                                {qIdx === 4 && <button onClick={generateMore} className="block w-full mt-4 bg-rose-500 text-white py-2 rounded-lg font-bold">Generate More Questions</button>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 capitalize">{type}</h2>
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
                {renderContent()}
                
                {type !== 'speaking' && type !== 'grammar' && (
                    <button onClick={handleAnswer} className="w-full mt-6 bg-stone-900 text-white py-3 rounded-xl font-bold">Submit</button>
                )}
                {type !== 'grammar' && feedback && <div className={`mt-4 p-4 rounded-xl text-center ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{feedback === 'correct' ? '✅ Correct' : '❌ Incorrect'}</div>}
                
                {type !== 'grammar' && (
                    <div className="flex justify-between mt-8">
                        <button onClick={() => {setIndex(i => Math.max(0, i - 1)); setFeedback(null); setAnswer('');}} className="px-4 py-2 bg-stone-100 rounded-xl">Previous</button>
                        {index === localSet.length - 1 ? (
                            <button onClick={generateNewSet} className="px-6 py-2 bg-rose-500 text-white rounded-xl font-bold">Generate New Questions</button>
                        ) : (
                            <button onClick={() => {setIndex(i => Math.min(localSet.length - 1, i + 1)); setFeedback(null); setAnswer('');}} className="px-4 py-2 bg-stone-100 rounded-xl">Next</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
  };

  const Feedback = ({ isCorrect }) => (
    <div className={`mt-4 p-4 rounded-xl flex items-center gap-2 ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
        {isCorrect ? <Check size={20} /> : <X size={20} />}
        {isCorrect ? "Correct! Well done." : "Incorrect. Try again."}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {activeSection === 'home' && <HomeView />}
        {activeSection === 'vocabulary' && <VocabularyPage />}
        {activeSection === 'lab' && <LabPage />}
        {activeSection === 'grammar' && <GeneratorPage type="grammar" dataSet={GRAMMAR_DB} />}
        {activeSection === 'reading' && <GeneratorPage type="reading" dataSet={getRandomReadingSet()} />}
        {activeSection === 'writing' && <WritingPage />}
        {activeSection === 'listening' && <ListeningPage />}
        {activeSection === 'speaking' && <SpeakingPage />}
        {activeSection === 'aitutor' && <AITutorPage />}
      </main>
    </div>
  );
}