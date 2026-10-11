import { dbState } from '../config/db.js';
import Birthday from '../models/Birthday.js';
import WorldObject from '../models/WorldObject.js';
import Fragrance from '../models/Fragrance.js';
import * as local from '../data/content.js';

// Strip Mongo internals so public responses never leak implementation details.
function clean(doc) {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  delete obj._id;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

function sourceTag() {
  return dbState.mode; // 'database' | 'fallback'
}

export async function getHealth(req, res) {
  res.json({
    status: 'ok',
    mode: dbState.mode,
    db: dbState.connected ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
}

export async function getBirthday(req, res, next) {
  try {
    if (dbState.connected) {
      const doc = await Birthday.findOne().lean();
      if (doc) {
        delete doc._id;
        delete doc.__v;
        return res.json({ source: 'database', data: doc });
      }
    }
    // Fallback: compose from local content modules.
    const data = {
      ...local.birthday,
      tiramisu: local.tiramisu,
      letter: local.letter,
      memories: local.memories
    };
    res.json({ source: sourceTag(), data });
  } catch (err) {
    next(err);
  }
}

export async function getWorldObjects(req, res, next) {
  try {
    if (dbState.connected) {
      const docs = await WorldObject.find().sort({ order: 1 }).lean();
      if (docs.length) {
        const data = docs.map((d) => {
          delete d._id;
          delete d.__v;
          return d;
        });
        return res.json({ source: 'database', data });
      }
    }
    res.json({ source: sourceTag(), data: local.worldObjects });
  } catch (err) {
    next(err);
  }
}

export async function getFragrances(req, res, next) {
  try {
    if (dbState.connected) {
      const docs = await Fragrance.find().sort({ order: 1 }).lean();
      if (docs.length) {
        const data = docs.map((d) => {
          delete d._id;
          delete d.__v;
          return d;
        });
        return res.json({ source: 'database', data });
      }
    }
    res.json({ source: sourceTag(), data: local.fragrances });
  } catch (err) {
    next(err);
  }
}

export async function getLetter(req, res, next) {
  try {
    if (dbState.connected) {
      const doc = await Birthday.findOne().lean();
      if (doc && doc.letter) {
        return res.json({ source: 'database', data: doc.letter });
      }
    }
    res.json({ source: sourceTag(), data: local.letter });
  } catch (err) {
    next(err);
  }
}

export { clean };
