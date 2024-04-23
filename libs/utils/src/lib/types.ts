export interface Post {
  id: string
  country: string
  product: string
  score: number
  comment: string
  user: string
}

export interface FetchPosts {
  product: string
  country: string
}

export interface EditPost {
  id: string
}

export interface FetchScores {
  product: string
  country: string
}

export interface Scores {
  message: string
  scores: Record<string, number>
  status: string
}

export interface Country {
  id: string
  name: string
}
