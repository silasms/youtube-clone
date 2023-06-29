const route = "/get-video/12313"

import { parse } from 'url';

const parsedUrl = parse(route, true);

const path = parsedUrl.pathname;
console.log(path.split("/").pop())