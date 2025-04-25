export default () => {
  const config = useRuntimeConfig().public

  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref(null)
  const hasMore = ref(true)

  const resetPagination = () => {
    page.value = 1
    results.value = []
    hasMore.value = true
  }

  const fetchResults = async (query: string, provider: string) => {
    // Reset for a new search
    resetPagination()

    loading.value = true
    try {
      let response: Response
      switch (provider) {
        case 'unsplash': {
          response = await fetch(
            `https://api.unsplash.com/search/photos?lang=fr&query=${query}&page=${page.value}&per_page=${perPage.value}`,
            {
              headers: {
                Authorization: `Client-ID ${config.UNSPLASH_API_KEY}`
              }
            }
          )
          const unsplashData = await response.json()
          results.value = unsplashData.results || []
          total.value = unsplashData.total
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'pexels': {
          response = await fetch(
            `https://api.pexels.com/v1/search?locale=fr-FR&query=${query}&per_page=${perPage.value}&page=${page.value}`,
            {
              headers: {
                Authorization: `${config.PEXELS_API_KEY}`
              }
            }
          )
          const pexelsData = await response.json()
          results.value = pexelsData.photos || []
          total.value = pexelsData.total_results
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'pixabay': {
          response = await fetch(
            `https://pixabay.com/api/?key=${config.PIXABAY_API_KEY}&lang=fr&q=${query}&per_page=${perPage.value}&page=${page.value}`
          )
          const pixabayData = await response.json()
          results.value = pixabayData.hits || []
          total.value = pixabayData.total
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'giphy': {
          response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${config.GIPHY_API_KEY}&q=${query}&limit=${perPage.value}&offset=${(page.value - 1) * perPage.value}`
          )
          const giphyData = await response.json()
          results.value = giphyData.data || []
          total.value = giphyData.pagination.total_count
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        default:
          throw new Error(`Invalid media provider: ${provider}`)
      }
    } catch (e) {
      error.value = e
    }
    loading.value = false
  }

  const loadMore = async (query: string, provider: string) => {
    if (!hasMore.value || loading.value) return

    page.value++
    loading.value = true

    try {
      let response: Response
      let newItems = []

      switch (provider) {
        case 'unsplash': {
          response = await fetch(
            `https://api.unsplash.com/search/photos?lang=fr&query=${query}&page=${page.value}&per_page=${perPage.value}`,
            {
              headers: {
                Authorization: `Client-ID ${config.UNSPLASH_API_KEY}`
              }
            }
          )
          const unsplashData = await response.json()
          newItems = unsplashData.results || []
          results.value = [...results.value, ...newItems]
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'pexels': {
          response = await fetch(
            `https://api.pexels.com/v1/search?locale=fr-FR&query=${query}&per_page=${perPage.value}&page=${page.value}`,
            {
              headers: {
                Authorization: `${config.PEXELS_API_KEY}`
              }
            }
          )
          const pexelsData = await response.json()
          newItems = pexelsData.photos || []
          results.value = [...results.value, ...newItems]
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'pixabay': {
          response = await fetch(
            `https://pixabay.com/api/?key=${config.PIXABAY_API_KEY}&lang=fr&q=${query}&per_page=${perPage.value}&page=${page.value}`
          )
          const pixabayData = await response.json()
          newItems = pixabayData.hits || []
          results.value = [...results.value, ...newItems]
          hasMore.value = page.value * perPage.value < total.value
          break
        }
        case 'giphy': {
          response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${config.GIPHY_API_KEY}&q=${query}&limit=${perPage.value}&offset=${(page.value - 1) * perPage.value}`
          )
          const giphyData = await response.json()
          newItems = giphyData.data || []
          results.value = [...results.value, ...newItems]
          hasMore.value = page.value * perPage.value < total.value
          break
        }
      }

      // If no new items are returned, set hasMore to false
      if (newItems.length === 0) hasMore.value = false
    } catch (e) {
      error.value = e
    }
    loading.value = false
  }

  const getImageSource = (item: any, provider: string) => {
    switch (provider) {
      case 'unsplash':
        return {
          preview: item?.urls?.thumb,
          src: item?.urls?.full,
          label: item?.alt_description,
          author: { url: item?.user?.links?.html, name: item?.user?.name }
        }
      case 'pexels':
        return {
          preview: item?.src?.tiny,
          src: item?.src?.original,
          label: item?.alt,
          author: { url: item?.photographer_url, name: item?.photographer }
        }
      case 'pixabay':
        return {
          preview: item?.previewURL,
          src: item?.largeImageURL,
          label: item?.tags,
          author: { url: item?.pageURL, name: item?.user }
        }
      case 'giphy':
        return {
          preview: item?.images?.preview_gif?.url,
          src: item?.images?.original?.url,
          label: item?.title,
          author: { url: item?.user?.profile_url, name: item?.user?.username }
        }
    }
  }

  return {
    page,
    perPage,
    results,
    total,
    loading,
    error,
    hasMore,
    fetchResults,
    loadMore,
    getImageSource
  }
}
