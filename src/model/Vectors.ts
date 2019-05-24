// tslint:disable-next-line:interface-name
export interface Vector {
  x: number;
  y: number;
  z: number;
}

export function dot(v1: Vector, v2: Vector): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function mag(v: Vector): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export function sub(v1: Vector, v2: Vector): Vector {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z
  };
}

export function add(v1: Vector, v2: Vector): Vector {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z
  };
}

export function scale(v: Vector, n: number): Vector {
  return {
    x: v.x * n,
    y: v.y * n,
    z: v.z * n
  };
}

export function norm(v: Vector): Vector {
  const m = 1 / mag(v);
  return {
    x: v.x * m,
    y: v.y * m,
    z: v.z * m
  };
}
