import { describe, it, expect } from 'vitest'
import { getDiseaseInfo } from '@/lib/disease-data'

describe('getDiseaseInfo', () => {
  it('returns disease info for known disease', () => {
    const info = getDiseaseInfo('anthracnose')
    expect(info.name).toBe('Anthracnose')
    expect(info.severity).toBeDefined()
    expect(info.treatment).toBeTruthy()
    expect(info.symptoms).toBeTruthy()
  })

  it('returns healthy info for "healthy" class', () => {
    const info = getDiseaseInfo('healthy')
    expect(info.severity).toBe('healthy')
    expect(info.treatment).toContain('No treatment')
  })

  it('returns unknown info for unrecognized class', () => {
    const info = getDiseaseInfo('some_unknown_disease_xyz')
    expect(info.name).toBe('Unknown')
    expect(info.severity).toBe('healthy')
  })

  it('has info for all major chili diseases', () => {
    const majorDiseases = [
      'anthracnose', 'bacterial_wilt', 'leaf_curl',
      'cercospora_leaf_spot', 'healthy'
    ]
    majorDiseases.forEach(d => {
      expect(getDiseaseInfo(d).name).not.toBe('Unknown')
    })
  })
})
