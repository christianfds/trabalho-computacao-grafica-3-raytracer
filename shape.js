class Sphere {
  constructor(center, radius, material) {
    this.center = center;
    this.radius = radius;
    this.material = material;
  }

  getIntersection(ray) {
    const cp = ray.origin.minus(this.center);

    const a = ray.direction.dot(ray.direction);
    const b = 2 * cp.dot(ray.direction);
    const c = cp.dot(cp) - this.radius * this.radius;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      // no intersection
      return null;
    }

    const sqrt = Math.sqrt(discriminant);

    const ts = [];

    const sub = (-b - sqrt) / (2 * a);
    if (sub >= 0) {
      ts.push(sub);
    }

    const add = (-b + sqrt) / (2 * a);
    if (add >= 0) {
      ts.push(add);
    }

    if (ts.length == 0) {
      return null;
    }

    return Math.min.apply(null, ts);
  }

  normalAt(point) {
    return point.minus(this.center).normalized();
  }
}

class Plane {
  constructor(center, normal, material) {
    this.center = center;
    this.normal = normal;
    this.material = material;
  }

  getIntersection(ray) {
    const n = this.normal.minus(this.center);
    const v = ray.direction.minus(ray.origin); 

    if(v.dot(n) == 0){
      // no intersection
      return null;
    }

    const t = -ray.origin.dot(n) / v.dot(n);

    return t;
  }

  normalAt(point) {
    return this.normal.minus(this.center).plus(point).normalized();
    // return point.minus(this.center).normalized();
  }
}
