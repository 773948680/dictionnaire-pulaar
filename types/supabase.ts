export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      words: {
        Row: {
          id: number
          word: string
          definition: string | null
          example: string | null
          created_at: string
        }
        Insert: {
          id?: number
          word: string
          definition?: string | null
          example?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          word?: string
          definition?: string | null
          example?: string | null
          created_at?: string
        }
      }
      synonyms: {
        Row: {
          id: number
          word_id: number
          synonym_id: number
          created_at: string
        }
        Insert: {
          id?: number
          word_id: number
          synonym_id: number
          created_at?: string
        }
        Update: {
          id?: number
          word_id?: number
          synonym_id?: number
          created_at?: string
        }
      }
    }
  }
}
