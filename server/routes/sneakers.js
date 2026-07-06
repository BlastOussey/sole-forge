import express from 'express'
import {
  getAllSneakers,
  getSneaker,
  createSneaker,
  updateSneaker,
  deleteSneaker
} from '../controllers/sneakers.js'

const router = express.Router()

router.get('/', getAllSneakers)
router.get('/:id', getSneaker)
router.post('/', createSneaker)
router.put('/:id', updateSneaker)
router.delete('/:id', deleteSneaker)

export default router
