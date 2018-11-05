// GENERATES MENU DATA FILES



// dependencies
_data = require('./data');
handlers = require('./handlers');
helpers = require('./helpers');


var menuItems = [
  {
    "menuId": "5be0362b0b89f089ba79155d",
    "menuIndex": 0,
    "availableToday": true,
    "price": 137.76,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "nulla irure ullamco occaecat",
    "description": "et occaecat magna ad officia irure incididunt incididunt aute amet"
  },
  {
    "menuId": "5be0362b264ee1ae316396f1",
    "menuIndex": 1,
    "availableToday": false,
    "price": 165.81,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "aliquip enim labore Lorem",
    "description": "occaecat elit culpa voluptate nisi anim laborum sunt cupidatat aliquip"
  },
  {
    "menuId": "5be0362bd9ec867d60d65a1f",
    "menuIndex": 2,
    "availableToday": true,
    "price": 153.77,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "elit anim culpa elit",
    "description": "et sunt velit velit proident esse voluptate do sint incididunt"
  },
  {
    "menuId": "5be0362b94940444668f44ab",
    "menuIndex": 3,
    "availableToday": false,
    "price": 126.66,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "consequat velit occaecat proident",
    "description": "sit ipsum eiusmod dolore magna adipisicing sit qui consequat cillum"
  },
  {
    "menuId": "5be0362bf402092847154daa",
    "menuIndex": 4,
    "availableToday": true,
    "price": 117.64,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "aute proident incididunt ullamco",
    "description": "in dolor cupidatat ipsum labore exercitation irure pariatur dolor anim"
  },
  {
    "menuId": "5be0362be7c105c81f036b46",
    "menuIndex": 5,
    "availableToday": true,
    "price": 158.45,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "aliqua ad commodo minim",
    "description": "ipsum in elit exercitation ullamco proident non et occaecat pariatur"
  },
  {
    "menuId": "5be0362bfe4b759d5dc94e87",
    "menuIndex": 6,
    "availableToday": false,
    "price": 112.18,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "qui voluptate duis sunt",
    "description": "in veniam occaecat cupidatat eiusmod proident mollit duis ut culpa"
  },
  {
    "menuId": "5be0362bc58aaa3956b4d2f0",
    "menuIndex": 7,
    "availableToday": true,
    "price": 126,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "laborum aute non ipsum",
    "description": "ad aliqua nulla enim officia sint nisi occaecat est consequat"
  },
  {
    "menuId": "5be0362b00c8a8d457493c41",
    "menuIndex": 8,
    "availableToday": false,
    "price": 138.48,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "adipisicing sint aliqua ex",
    "description": "adipisicing ad magna commodo consectetur laborum id enim do nulla"
  },
  {
    "menuId": "5be0362b613a635467e1d288",
    "menuIndex": 9,
    "availableToday": true,
    "price": 153.58,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "eiusmod dolor nisi ea",
    "description": "fugiat veniam exercitation deserunt laborum nisi reprehenderit nisi nulla laborum"
  },
  {
    "menuId": "5be0362bd9618a5584c381b3",
    "menuIndex": 10,
    "availableToday": true,
    "price": 181.34,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "deserunt voluptate ex nulla",
    "description": "elit ut non sunt occaecat dolor occaecat non amet ullamco"
  },
  {
    "menuId": "5be0362b3777e4715132e6ad",
    "menuIndex": 11,
    "availableToday": false,
    "price": 150.14,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "ad enim aute in",
    "description": "sit elit duis mollit voluptate fugiat et ipsum ad non"
  },
  {
    "menuId": "5be0362b57acb1d4b14e974e",
    "menuIndex": 12,
    "availableToday": false,
    "price": 114.44,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "dolore duis labore ullamco",
    "description": "consectetur proident dolore nulla sit ut ex irure non elit"
  },
  {
    "menuId": "5be0362b5fea33d6adf7fe99",
    "menuIndex": 13,
    "availableToday": true,
    "price": 175.62,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "elit nostrud proident ex",
    "description": "sunt ex est incididunt ut quis nisi voluptate exercitation dolore"
  },
  {
    "menuId": "5be0362b5ef31f84abb8e038",
    "menuIndex": 14,
    "availableToday": false,
    "price": 182.33,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "dolore ex ex non",
    "description": "ullamco qui voluptate culpa nulla minim est tempor veniam magna"
  },
  {
    "menuId": "5be0362b60586954aaaa2f43",
    "menuIndex": 15,
    "availableToday": true,
    "price": 109.48,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "qui occaecat sit magna",
    "description": "nulla enim deserunt est nostrud nulla aliqua velit fugiat nostrud"
  },
  {
    "menuId": "5be0362b30e19fdf4e5403de",
    "menuIndex": 16,
    "availableToday": true,
    "price": 142.56,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "laboris ullamco proident aliquip",
    "description": "nisi culpa tempor aliquip elit ut quis aute ea mollit"
  },
  {
    "menuId": "5be0362b947eec11a7ea7ecc",
    "menuIndex": 17,
    "availableToday": false,
    "price": 131.1,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "veniam incididunt laboris cupidatat",
    "description": "reprehenderit officia ea aliqua incididunt dolor adipisicing eiusmod laborum voluptate"
  },
  {
    "menuId": "5be0362bd64a6b03c5f33a11",
    "menuIndex": 18,
    "availableToday": false,
    "price": 139.32,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "nulla elit laboris labore",
    "description": "cillum sint commodo dolore occaecat consequat quis exercitation consectetur qui"
  },
  {
    "menuId": "5be0362b92d71fca02e4dcb3",
    "menuIndex": 19,
    "availableToday": true,
    "price": 107.87,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ut excepteur elit ut",
    "description": "magna pariatur in nostrud laboris eu sunt in magna deserunt"
  },
  {
    "menuId": "5be0362bd1fbe64e367b191e",
    "menuIndex": 20,
    "availableToday": true,
    "price": 193.1,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "irure proident sit eiusmod",
    "description": "amet labore ex id ex elit eiusmod cillum irure tempor"
  },
  {
    "menuId": "5be0362b497f5f619c40efad",
    "menuIndex": 21,
    "availableToday": true,
    "price": 173.39,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "cupidatat ullamco ex veniam",
    "description": "incididunt incididunt cupidatat minim nisi esse irure eu deserunt quis"
  },
  {
    "menuId": "5be0362b76462204bfdd580f",
    "menuIndex": 22,
    "availableToday": false,
    "price": 160.29,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "voluptate ut proident duis",
    "description": "Lorem pariatur nisi quis eiusmod ipsum anim eiusmod nostrud dolore"
  },
  {
    "menuId": "5be0362bff3e0ace470af957",
    "menuIndex": 23,
    "availableToday": true,
    "price": 115.86,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "eu eiusmod nulla sit",
    "description": "duis deserunt id commodo proident culpa ipsum tempor Lorem tempor"
  },
  {
    "menuId": "5be0362b1435a6f88f48c3db",
    "menuIndex": 24,
    "availableToday": true,
    "price": 162.21,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "esse cupidatat amet minim",
    "description": "ut est dolor eiusmod dolore deserunt occaecat voluptate exercitation consectetur"
  },
  {
    "menuId": "5be0362b950763a6c065ba80",
    "menuIndex": 25,
    "availableToday": false,
    "price": 141.44,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "eiusmod deserunt cupidatat commodo",
    "description": "ad sint sit dolor sunt veniam elit amet ipsum reprehenderit"
  },
  {
    "menuId": "5be0362b94c7c03b02080675",
    "menuIndex": 26,
    "availableToday": false,
    "price": 184.32,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "commodo ex cupidatat mollit",
    "description": "irure occaecat officia enim dolore aute tempor sit est dolor"
  },
  {
    "menuId": "5be0362b081f1f5cd24789de",
    "menuIndex": 27,
    "availableToday": true,
    "price": 189.19,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "sint anim Lorem aute",
    "description": "aute est non Lorem cupidatat commodo incididunt et adipisicing non"
  },
  {
    "menuId": "5be0362b970849d20ecbfd37",
    "menuIndex": 28,
    "availableToday": true,
    "price": 197.61,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "culpa nisi anim consequat",
    "description": "Lorem culpa id non ipsum et fugiat cillum quis cillum"
  },
  {
    "menuId": "5be0362b52f6295cf255b6ed",
    "menuIndex": 29,
    "availableToday": true,
    "price": 183.67,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "voluptate magna commodo veniam",
    "description": "incididunt anim ullamco id fugiat aliqua sint velit cupidatat sit"
  },
  {
    "menuId": "5be0362be1fe6b6fffff7ebe",
    "menuIndex": 30,
    "availableToday": false,
    "price": 155.81,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "sint sint labore commodo",
    "description": "sit ea esse aliquip reprehenderit id voluptate officia est nisi"
  },
  {
    "menuId": "5be0362b315e519debec09a8",
    "menuIndex": 31,
    "availableToday": false,
    "price": 146.67,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ipsum sit velit pariatur",
    "description": "ea cupidatat est quis et reprehenderit et Lorem consectetur veniam"
  },
  {
    "menuId": "5be0362bbadcb01b8ea3ff8f",
    "menuIndex": 32,
    "availableToday": true,
    "price": 163.3,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "mollit id ipsum amet",
    "description": "mollit quis cillum esse deserunt sit sint enim eu minim"
  },
  {
    "menuId": "5be0362bff8fd1a6dd4d62c5",
    "menuIndex": 33,
    "availableToday": true,
    "price": 182.32,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "esse nulla dolore aliquip",
    "description": "laboris ad amet ut nostrud in ad culpa excepteur est"
  },
  {
    "menuId": "5be0362bb41e844506b0e1fe",
    "menuIndex": 34,
    "availableToday": false,
    "price": 155.41,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "adipisicing id et pariatur",
    "description": "ea cillum deserunt est consequat sit mollit cillum consequat ex"
  },
  {
    "menuId": "5be0362b5c051fd4a7995222",
    "menuIndex": 35,
    "availableToday": true,
    "price": 161.96,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "mollit mollit excepteur excepteur",
    "description": "elit ex in ullamco consectetur excepteur voluptate elit voluptate non"
  },
  {
    "menuId": "5be0362b4664aeea24372c5b",
    "menuIndex": 36,
    "availableToday": true,
    "price": 111.17,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "do sint est amet",
    "description": "magna officia est incididunt aliquip pariatur ut veniam fugiat elit"
  },
  {
    "menuId": "5be0362bee1579c3cf494a69",
    "menuIndex": 37,
    "availableToday": true,
    "price": 152.39,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "sunt amet do anim",
    "description": "laborum quis consequat quis elit laboris laborum commodo cupidatat eu"
  },
  {
    "menuId": "5be0362bcffe01631e7629ab",
    "menuIndex": 38,
    "availableToday": false,
    "price": 147.18,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "laboris nostrud nostrud sit",
    "description": "magna reprehenderit enim ea culpa officia et fugiat excepteur ea"
  },
  {
    "menuId": "5be0362b179478fccc81cf59",
    "menuIndex": 39,
    "availableToday": false,
    "price": 197.9,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "ea officia ut sit",
    "description": "commodo consequat reprehenderit deserunt magna reprehenderit quis sit excepteur eu"
  },
  {
    "menuId": "5be0362bfd2ad761714c63ec",
    "menuIndex": 40,
    "availableToday": true,
    "price": 178.87,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "nisi mollit veniam non",
    "description": "est magna Lorem in sint enim ipsum laborum ea ea"
  },
  {
    "menuId": "5be0362bc07f806dbbeef8d4",
    "menuIndex": 41,
    "availableToday": false,
    "price": 112.59,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "qui nisi occaecat veniam",
    "description": "tempor nisi voluptate enim officia reprehenderit et sit fugiat commodo"
  },
  {
    "menuId": "5be0362bfbd9790d103fd39e",
    "menuIndex": 42,
    "availableToday": true,
    "price": 129.86,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "magna ut magna non",
    "description": "amet ullamco amet consectetur excepteur est nulla commodo quis irure"
  },
  {
    "menuId": "5be0362bbf09ec70eb35d176",
    "menuIndex": 43,
    "availableToday": false,
    "price": 157.4,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "eu velit aliqua consectetur",
    "description": "ex eiusmod tempor in Lorem veniam ex aute cupidatat officia"
  },
  {
    "menuId": "5be0362bccb2cb346aa75e31",
    "menuIndex": 44,
    "availableToday": false,
    "price": 169.84,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "anim dolor veniam est",
    "description": "Lorem exercitation esse nostrud minim excepteur aliqua et qui aute"
  },
  {
    "menuId": "5be0362bd55ca45e09ce5352",
    "menuIndex": 45,
    "availableToday": true,
    "price": 134.26,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "irure aliqua non incididunt",
    "description": "sunt elit cupidatat enim proident ea adipisicing esse Lorem consequat"
  },
  {
    "menuId": "5be0362be7a573777bfabc5b",
    "menuIndex": 46,
    "availableToday": true,
    "price": 120.18,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "magna amet sunt labore",
    "description": "voluptate enim incididunt duis proident elit id pariatur excepteur non"
  },
  {
    "menuId": "5be0362b5fee41b04300c6aa",
    "menuIndex": 47,
    "availableToday": true,
    "price": 149.17,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "mollit elit reprehenderit voluptate",
    "description": "deserunt mollit velit et do est qui ut cillum reprehenderit"
  },
  {
    "menuId": "5be0362b0b26fea61ad5dd63",
    "menuIndex": 48,
    "availableToday": false,
    "price": 135.91,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "excepteur incididunt adipisicing occaecat",
    "description": "laborum esse exercitation proident magna ipsum eu laborum mollit ea"
  },
  {
    "menuId": "5be0362bc11b930a8a357d6d",
    "menuIndex": 49,
    "availableToday": true,
    "price": 198.8,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "eu amet tempor cillum",
    "description": "eiusmod quis non ad sint veniam ut aute pariatur id"
  },
  {
    "menuId": "5be0362b1f26c0ca737e7603",
    "menuIndex": 50,
    "availableToday": false,
    "price": 102.99,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ad labore occaecat occaecat",
    "description": "officia ad culpa aute irure voluptate aliquip commodo dolore consequat"
  },
  {
    "menuId": "5be0362bbdc7bc00a56d0050",
    "menuIndex": 51,
    "availableToday": true,
    "price": 185.91,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "Lorem aliqua aute magna",
    "description": "irure aliqua ex cupidatat do culpa cillum consectetur ad amet"
  },
  {
    "menuId": "5be0362b2055e0c10a5bdffa",
    "menuIndex": 52,
    "availableToday": true,
    "price": 166.66,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "duis occaecat nulla laboris",
    "description": "officia velit Lorem est ea et dolore amet pariatur deserunt"
  },
  {
    "menuId": "5be0362b358b0a18186a4a2a",
    "menuIndex": 53,
    "availableToday": false,
    "price": 175.67,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "exercitation consequat anim ad",
    "description": "pariatur anim magna in adipisicing proident elit amet duis adipisicing"
  },
  {
    "menuId": "5be0362bfc0e52a504568e42",
    "menuIndex": 54,
    "availableToday": true,
    "price": 182.85,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "dolore deserunt consequat cillum",
    "description": "fugiat dolore non amet magna id amet dolore reprehenderit ut"
  },
  {
    "menuId": "5be0362b12fe22777ddae228",
    "menuIndex": 55,
    "availableToday": false,
    "price": 145.68,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "ut id pariatur duis",
    "description": "irure et et ipsum minim est sunt aliqua aliqua Lorem"
  },
  {
    "menuId": "5be0362b2c406b4f4a4acd82",
    "menuIndex": 56,
    "availableToday": true,
    "price": 157.81,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "consectetur nostrud exercitation tempor",
    "description": "esse incididunt reprehenderit mollit cupidatat elit ullamco duis Lorem nostrud"
  },
  {
    "menuId": "5be0362b5a3a199b6e0a2d00",
    "menuIndex": 57,
    "availableToday": true,
    "price": 198.41,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "qui ullamco cupidatat anim",
    "description": "ipsum commodo est do officia mollit ipsum labore tempor culpa"
  },
  {
    "menuId": "5be0362b29b9ff4a379e79f0",
    "menuIndex": 58,
    "availableToday": false,
    "price": 199.46,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "consequat elit enim esse",
    "description": "est Lorem ut nostrud esse voluptate excepteur est officia velit"
  },
  {
    "menuId": "5be0362b6a1a7a0f0ca1dbf8",
    "menuIndex": 59,
    "availableToday": true,
    "price": 178.19,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "nulla ut irure dolor",
    "description": "qui et Lorem nulla tempor est ex nostrud ea occaecat"
  },
  {
    "menuId": "5be0362b2384ed2913fd9232",
    "menuIndex": 60,
    "availableToday": false,
    "price": 135.79,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "Lorem eiusmod irure velit",
    "description": "mollit ullamco anim duis aliquip duis ullamco non laboris et"
  },
  {
    "menuId": "5be0362b0bcd76db4c8f3d52",
    "menuIndex": 61,
    "availableToday": true,
    "price": 118.4,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "tempor excepteur qui ea",
    "description": "laborum incididunt esse nisi reprehenderit sint fugiat et commodo laboris"
  },
  {
    "menuId": "5be0362bdebaf4a5aa2bfe04",
    "menuIndex": 62,
    "availableToday": true,
    "price": 133.46,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "Lorem id eiusmod anim",
    "description": "et officia qui ea consequat ad consequat tempor ullamco proident"
  },
  {
    "menuId": "5be0362bc79ea49fce4992ed",
    "menuIndex": 63,
    "availableToday": false,
    "price": 179,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "mollit anim mollit cillum",
    "description": "consequat in voluptate deserunt veniam deserunt voluptate dolore ex velit"
  },
  {
    "menuId": "5be0362b1866a0921665eac6",
    "menuIndex": 64,
    "availableToday": false,
    "price": 149.44,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "labore sunt exercitation enim",
    "description": "eiusmod est deserunt do tempor fugiat ipsum ipsum ex veniam"
  },
  {
    "menuId": "5be0362be37a3926ce6d62a3",
    "menuIndex": 65,
    "availableToday": false,
    "price": 123.51,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "cupidatat voluptate minim pariatur",
    "description": "proident dolor pariatur ad dolor in eiusmod Lorem amet in"
  },
  {
    "menuId": "5be0362b7352772f81f67022",
    "menuIndex": 66,
    "availableToday": false,
    "price": 191.22,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ipsum qui sint consequat",
    "description": "do Lorem veniam esse aute aliquip velit pariatur ullamco sit"
  },
  {
    "menuId": "5be0362b5a72ee652dd82422",
    "menuIndex": 67,
    "availableToday": true,
    "price": 158.94,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "ipsum dolor in culpa",
    "description": "magna ad duis irure aute voluptate incididunt ut elit nisi"
  },
  {
    "menuId": "5be0362b922db8637acdd216",
    "menuIndex": 68,
    "availableToday": false,
    "price": 145.73,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "occaecat Lorem duis dolore",
    "description": "esse labore nisi amet elit occaecat velit amet labore aute"
  },
  {
    "menuId": "5be0362b4e9d408619c482da",
    "menuIndex": 69,
    "availableToday": true,
    "price": 184.83,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "nisi labore non ex",
    "description": "irure cupidatat quis aute exercitation reprehenderit ut qui laborum sunt"
  },
  {
    "menuId": "5be0362b5a4f30b3eb5c2898",
    "menuIndex": 70,
    "availableToday": false,
    "price": 136.14,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "tempor irure do nostrud",
    "description": "excepteur qui voluptate excepteur sit ut velit aute ex reprehenderit"
  },
  {
    "menuId": "5be0362baa1ff4440e36b88f",
    "menuIndex": 71,
    "availableToday": true,
    "price": 132.17,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "labore sint laboris nulla",
    "description": "culpa proident incididunt est aliqua veniam ipsum non tempor magna"
  },
  {
    "menuId": "5be0362b30a21c118dbb9d07",
    "menuIndex": 72,
    "availableToday": true,
    "price": 108.72,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "irure ex sunt ullamco",
    "description": "in dolore tempor proident Lorem pariatur laboris dolore excepteur cillum"
  },
  {
    "menuId": "5be0362b0b774f5ea51b0a96",
    "menuIndex": 73,
    "availableToday": false,
    "price": 114.94,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "magna pariatur nulla culpa",
    "description": "minim laboris tempor dolore nulla fugiat ad occaecat consectetur commodo"
  },
  {
    "menuId": "5be0362bd48cb88058c74162",
    "menuIndex": 74,
    "availableToday": false,
    "price": 145.95,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "do enim exercitation ullamco",
    "description": "adipisicing aliquip sunt cillum duis nisi mollit proident occaecat elit"
  },
  {
    "menuId": "5be0362b8cdecec3ee8beef1",
    "menuIndex": 75,
    "availableToday": true,
    "price": 186.43,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "in fugiat commodo nostrud",
    "description": "amet occaecat ex aliqua nulla est ex ex ad ex"
  },
  {
    "menuId": "5be0362bdff2ab74976dc711",
    "menuIndex": 76,
    "availableToday": true,
    "price": 119.76,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "adipisicing reprehenderit esse et",
    "description": "incididunt proident deserunt excepteur occaecat pariatur labore incididunt magna cupidatat"
  },
  {
    "menuId": "5be0362b315e8ef2868f73cb",
    "menuIndex": 77,
    "availableToday": false,
    "price": 123.76,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "esse deserunt laboris laboris",
    "description": "aliqua do et Lorem incididunt proident amet ad voluptate eu"
  },
  {
    "menuId": "5be0362b9f5a516d32abf109",
    "menuIndex": 78,
    "availableToday": false,
    "price": 126.15,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "est occaecat exercitation consectetur",
    "description": "cillum cupidatat deserunt veniam nostrud nostrud et officia cupidatat enim"
  },
  {
    "menuId": "5be0362b263495b8ed6e38cd",
    "menuIndex": 79,
    "availableToday": true,
    "price": 172.36,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ut cupidatat duis enim",
    "description": "amet eu incididunt duis voluptate sint mollit labore eiusmod Lorem"
  },
  {
    "menuId": "5be0362bc6ff7755e55ffe06",
    "menuIndex": 80,
    "availableToday": true,
    "price": 115.96,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "proident consectetur cupidatat incididunt",
    "description": "nostrud veniam tempor exercitation aliquip non in ea ea consectetur"
  },
  {
    "menuId": "5be0362bc890f42b20fe89b7",
    "menuIndex": 81,
    "availableToday": false,
    "price": 192.9,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "occaecat dolor cillum veniam",
    "description": "dolore consectetur minim reprehenderit ea sunt ipsum et magna aute"
  },
  {
    "menuId": "5be0362b8442a19cf5baf236",
    "menuIndex": 82,
    "availableToday": false,
    "price": 150.11,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "consequat velit id commodo",
    "description": "duis ad ex ut nisi excepteur cillum commodo dolore adipisicing"
  },
  {
    "menuId": "5be0362bd34ae5f1338d2749",
    "menuIndex": 83,
    "availableToday": false,
    "price": 115.27,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "veniam eiusmod do occaecat",
    "description": "ullamco ullamco aliquip anim est exercitation ullamco qui proident fugiat"
  },
  {
    "menuId": "5be0362b0aab2f3508d1f3ca",
    "menuIndex": 84,
    "availableToday": false,
    "price": 145.38,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ex esse labore aliquip",
    "description": "mollit duis labore sit quis minim eiusmod velit sint ea"
  },
  {
    "menuId": "5be0362bce24e55936ec006f",
    "menuIndex": 85,
    "availableToday": false,
    "price": 130.06,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "adipisicing exercitation aliqua ipsum",
    "description": "nisi cillum est exercitation consectetur occaecat officia tempor aute ad"
  },
  {
    "menuId": "5be0362be6accb5986d83ba9",
    "menuIndex": 86,
    "availableToday": true,
    "price": 105.18,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "exercitation ut ea sit",
    "description": "ea dolor id minim cupidatat eu est est nulla laborum"
  },
  {
    "menuId": "5be0362b32992a475a3e36a5",
    "menuIndex": 87,
    "availableToday": true,
    "price": 114.83,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "ad aliquip cupidatat sunt",
    "description": "ea ex ipsum incididunt anim magna ad nisi qui ex"
  },
  {
    "menuId": "5be0362b3ec82563e6762c6c",
    "menuIndex": 88,
    "availableToday": true,
    "price": 138.17,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "laborum irure enim commodo",
    "description": "do cupidatat laborum officia non voluptate laborum eiusmod laborum dolore"
  },
  {
    "menuId": "5be0362bb86abc04b74468d0",
    "menuIndex": 89,
    "availableToday": false,
    "price": 166.9,
    "picture": "http://placehold.it/32x32",
    "category": "main course",
    "name": "esse mollit dolore sit",
    "description": "eiusmod sint est adipisicing eu aliquip id occaecat laboris ad"
  },
  {
    "menuId": "5be0362b760903f0bd77ca41",
    "menuIndex": 90,
    "availableToday": false,
    "price": 109.49,
    "picture": "http://placehold.it/32x32",
    "category": "starter",
    "name": "reprehenderit ex irure quis",
    "description": "enim amet ad ut enim laboris non culpa ea ex"
  },
  {
    "menuId": "5be0362b1b0ff8e437a1a52e",
    "menuIndex": 91,
    "availableToday": true,
    "price": 155.26,
    "picture": "http://placehold.it/32x32",
    "category": "dessert",
    "name": "excepteur aliqua officia amet",
    "description": "est quis cupidatat laboris labore dolore non aute commodo esse"
  }
];

handlers._menu.generate(menuItems,function(err){
	if (err) {
		console.log(helpers.red,"Error in generatingfiles");
	}
});

