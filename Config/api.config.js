baseurl = {
    url: 'http://localhost:81/DevOps/QuMSApi/api/',
}
endpoints = {
    auth: {
        signin: baseurl.url + 'auth/verifyusecret',
        signup: baseurl.url + 'auth/signup',
    },
    appointment: {
        create: baseurl.url + 'appointment/create',
        fetch: baseurl.url + 'appointment/fetch'
    },
    visit: {
        create: baseurl.url + 'visit/create',
        fetch: baseurl.url + 'visit/fetch'
    },
    video: {
        create: baseurl.url + 'video/create',
        view: baseurl.url + 'video/view',
        fetch: baseurl.url + 'video/fetch'
    },
    analytics: {
        stats: baseurl.url + 'analytics/data-blocks'
    }
}