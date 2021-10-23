import {useEffect, useRef, useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
// import * as inputSelectors from './state/input/selectors';
import * as inputActions from './state/input/actions';

const KEY_CODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

const HERO = {
  WIDTH: 10,
  HEIGHT: 10
}

const move = ({x,y}, speed, input) => {
  y = input.includes(KEY_CODE.DOWN) ? y + speed : input.includes(KEY_CODE.UP) ? y - speed : y;
  x = input.includes(KEY_CODE.LEFT) ? x - speed : input.includes(KEY_CODE.RIGHT) ? x + speed : x;
  y = Math.round(y * 10) / 10;
  x = Math.round(x * 10) / 10;
  return {x,y};
}

const TileGrid = () => {

  const dispatch = useDispatch();

  // const up = useSelector(inputSelectors.up);
  // const down = useSelector(inputSelectors.down);
  // const left = useSelector(inputSelectors.left);
  // const right = useSelector(inputSelectors.right);

  const canvasRef = useRef(null);
  const frameRequest = useRef();
  const lastFrameTime = useRef(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [input, setInput] = useState([]);

  const onFrame = time => {
    if(!canvasRef.current) return;

    const delta = (time - lastFrameTime.current) / 50;

    const point = move({x,y}, delta, input);
    // if(x !== point.x || y !== point.y)
      // console.log(point);
    if(x !== point.x) setX(point.x);
    if(y !== point.y) setY(point.y);

    const ctx = canvasRef.current.getContext('2d');

    // background
    ctx.fillStyle = '#440044';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // hero
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(point.x, point.y, HERO.WIDTH, HERO.HEIGHT);

    lastFrameTime.current = time;

    frameRequest.current = requestAnimationFrame(onFrame);
  };

  const onKeyDown = ({keyCode}) => {
    if(!input.includes(keyCode)) setInput([...input, keyCode]);
  };
  const onKeyUp = ({keyCode}) => {
    if(input.includes(keyCode)) setInput(input.filter(v => v !== keyCode))
  };

  const onKeyDownCallback = useCallback(onKeyDown, [input]);
  const onKeyUpCallback = useCallback(onKeyUp, [input]);
  const onFrameCallback = useCallback(onFrame, [x, y, input, onFrame])

  useEffect(() => {
    const id = 'tile grid';
    dispatch(inputActions.initialize({id}));
    return () => dispatch(inputActions.destroy({id}));
  }, [dispatch])

  useEffect(() => {
    frameRequest.current = requestAnimationFrame(onFrameCallback);
    const keyOptions = {capture: false};
    // multiple keys down at the same time freezing logic
    window.addEventListener("keydown", onKeyDownCallback, keyOptions);
    window.addEventListener("keyup", onKeyUpCallback, keyOptions);
    return () => {
      cancelAnimationFrame(frameRequest.current);
      window.removeEventListener("keydown", onKeyDownCallback, keyOptions);
      window.removeEventListener("keyup", onKeyUpCallback, keyOptions);
    }
  }, [onFrameCallback, onKeyDownCallback, onKeyUpCallback]);

    return <canvas ref={canvasRef} width="100%" height="100%" />
  }

export default TileGrid;
