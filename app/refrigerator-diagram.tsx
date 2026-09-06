/** Simplified refrigerator cutaway. The three regions match the context controls. */
export function RefrigeratorDiagram({ selected }: { selected: number }) {
  return (
    <svg
      viewBox="0 0 540 480"
      className="context-appliance"
      role="img"
      aria-label="Refrigerator wireframe showing the model label, cooling circuit, and lower service compartment"
    >
      <g className="fridge-construction">
        <path d="M144 428 L333 450 L432 390 M158 85 L158 410 M170 75 L405 75" />
        <path d="M174 420 L309 434 L409 383 L275 369 Z" />
      </g>
      <g className="fridge-hidden">
        <path d="M187 105 L273 61 L386 81 L300 125 Z M273 61 L273 356 L187 400 M273 356 L386 376" />
        {[218, 267, 316].map((y) => (
          <path
            key={y}
            d={`M194 ${y} L274 ${y - 41} L378 ${y - 23} L298 ${y + 19} Z`}
          />
        ))}
      </g>
      <g className="fridge-shell">
        <path d="M181 98 Q181 91 188 92 L307 112 Q314 113 314 121 L314 414 Q314 421 307 420 L188 400 Q181 399 181 392 Z" />
        <path d="M185 92 L272 47 Q276 45 282 46 L394 65 Q401 66 401 74 L401 365 Q401 372 395 375 L314 419 M308 113 L397 68" />
        <path d="M314 213 L401 168 M187 198 L308 219" />
        <path d="M189 101 L306 121 L306 206 L189 186 Z M189 206 L306 226 L306 383 L189 363 Z" />
        <path d="M194 407 L194 416 L208 419 L208 409 M294 424 L294 433 L307 435 L307 425 M386 383 L386 391 L396 386 L396 378" />
      </g>
      <g className="fridge-handles">
        <path d="M286 146 L286 179 Q286 182 290 181 L295 178 L295 144 Z M286 244 L286 303 Q286 307 290 305 L295 302 L295 242 Z M290 145 L290 179 M290 244 L290 303" />
      </g>
      <g
        className={
          selected === 0 ? 'appliance-part is-active' : 'appliance-part'
        }
      >
        <path d="M204 126 L258 135 L258 161 L204 152 Z" />
        <path d="M210 133 L246 139 M210 140 L232 144 M239 145 L249 147" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${211 + i * 4} ${145 + i * 0.68} l0 5`} />
        ))}
      </g>
      <g
        className={
          selected === 1 ? 'appliance-part is-active' : 'appliance-part'
        }
      >
        <path
          d="M334 195 L382 170 L382 326 L334 351 Z"
          className="fridge-hidden"
        />
        <path d="M345 341 L345 331 L372 317 Q381 312 373 308 L347 321 Q339 325 346 315 L372 302 Q381 297 373 293 L347 306 Q339 310 346 300 L372 287 Q381 282 373 278 L347 291 Q339 295 346 285 L372 272 Q381 267 373 263 L347 276 Q339 280 346 270 L372 257 Q381 252 373 248 L347 261 Q339 265 346 255 L372 242 Q381 237 373 233 L347 246 Q339 250 346 240 L372 227 Q381 222 373 218 L347 231 Q339 235 346 225 L372 212 Q381 207 373 203 L347 216 L347 202" />
      </g>
      <g
        className={
          selected === 2 ? 'appliance-part is-active' : 'appliance-part'
        }
      >
        <path d="M189 373 L306 393 L306 411 L189 391 Z" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M199 ${379 + i * 4} L295 ${395 + i * 4}`} />
        ))}
        <path d="M331 375 L381 350 L390 355 L340 381 Z M345 368 L345 356 Q345 343 360 341 Q375 339 375 351 L375 355 M345 356 Q358 361 375 351 M358 341 L358 333 L368 328" />
      </g>
      <g className="appliance-leaders">
        <path data-active={selected === 0} d="M204 139 L141 139 L124 139" />
        <path data-active={selected === 1} d="M366 259 L418 235 L441 235" />
        <path data-active={selected === 2} d="M357 364 L408 398 L440 398" />
      </g>
      <g className="fridge-anchors">
        <circle cx="204" cy="139" r="3" data-active={selected === 0} />
        <circle cx="366" cy="259" r="3" data-active={selected === 1} />
        <circle cx="357" cy="364" r="3" data-active={selected === 2} />
      </g>
    </svg>
  );
}
