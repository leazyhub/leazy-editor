export default ((provider: any, query: string, params: null | undefined) => {
  switch (provider) {
    case 'unsplash':
      return useUnsplash(query, params)
    case 'pexels':
      return usePexels(query, params)
    case 'pixabay':
      return usePixabay(query, params)
    case 'giphy':
      return useGiphy(query, params)
    default:
      throw new Error(`Invalid media provider: ${provider}`)
  }
})

const useGiphy = async (query: string, params = null) => {
  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=XZCb6YM0i35nWuplG5lY6VrrKmmHPHlg&q=${ query }&limit=${ perPage.value }&offset=${ page.value }`)

    const data = await response.json()

    results.value = data.data
    total.value = data.pagination.total_count
  } catch (e) {
    // @ts-ignore
    error.value = e
  }

  loading.value = false

  return {
    page,
    perPage,
    results,
    total,
    loading,
    error
  }
}

const usePixabay = async (query: string, params = null) => {
  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  try {
    const response = await fetch(`https://pixabay.com/api/?key=2778993-0d12bdd6df9eb23263eb4e60c&lang=fr&q=${ query }&per_page=${ perPage.value }&page=${ page.value }`)

    const data = await response.json()

    results.value = data.hits
    total.value = data.total
  } catch (e) {
    // @ts-ignore
    error.value = e
  }

  loading.value = false

  return {
    page,
    perPage,
    results,
    total,
    loading,
    error
  }
}

const usePexels = async (query: string, params = null) => {
  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)


  try {
    const response = await fetch(`https://api.pexels.com/v1/search?&locale=fr-FR&query=${ query }&per_page=${ perPage.value }`, {
      headers: {
        Authorization: `LIa1K3Kh8xNT1GfDSB54Sya5h6ZTl21o6yDh2nY1gwBWaCz9irQNwJ2N`,
      },
    })

    const data = await response.json()

    results.value = data.photos
    total.value = data.total_results
  } catch (e) {
    // @ts-ignore
    error.value = e
  }

  loading.value = false

  return {
    page,
    perPage,
    results,
    total,
    loading,
    error
  }
}

const useUnsplash = async (query: string, params = null) => {
  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  try {
    const response = await $fetch(`https://api.unsplash.com/search/photos?lang=fr&query=${ query }&page=${ page.value }&per_page=${ perPage.value }`, {
      headers: {
        Authorization: `Client-ID LaM-gWUV5DCcsNJugz2Ne0kwaV6OnOAjr879lqPjvcg`,
      },
    })


    results.value = response.results
    total.value = response.total
  } catch (e) {
    // @ts-ignore
    error.value = e
  }

  loading.value = false

  return {
    query,
    page,
    perPage,
    results,
    total,
    loading,
    error
  }
}
