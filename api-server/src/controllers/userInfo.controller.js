const userInfoService = require("../services/userInfo.service");
const movieService = require("../services/movie.service");
exports.getInfo = async (req, res) => {
    let userId = req.user._id;
    await userInfoService.getInfo(userId).then(user => {
        if (!user) {
            return res.json({
                message: "Not found user",
            })
        } else {
            return res.status(200).json({ message: "OK", user });
        }
    })
}

exports.getMovies = async (req, res) => {
    let userId = req.user._id;
    await userInfoService.getMovies(userId).then(movies => {
        if (!movies) {
            return res.status(200).json({
                message: "Not found movies",
            })
        }
        return res.status(200).json({ message: "OK", movies });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.getLists = async (req, res) => {
    let userId = req.user._id;
    await userInfoService.getLists(userId).then(movies => {
        if (!movies) {
            return res.status(200).json({
                message: "Not found lists",
            })
        }
        return res.status(200).json({ message: "OK", movies });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.getFavorite = async (req, res) => {
    let userId = req.user._id;
    await userInfoService.getFavorite(userId).then(movies => {
        if (!movies) {
            return res.status(200).json({
                message: "Not found favorite",
            })
        }
        return res.status(200).json({ message: "OK", movies });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.getRecent = async (req, res) => {
    let userId = req.user._id;
    await userInfoService.getRecent(userId).then(movies => {
        if (!movies) {
            return res.status(200).json({
                message: "Not found movies",
            })
        }
        return res.status(200).json({ message: "OK", movies });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.addToFavorite = async (req, res) => {
    let userId = req.user._id;
    let movieId = req.params.id;
    try {
        const movie = await movieService.getMovieInfo(movieId);
        if (!movie) {
            return res.status(200).json({
                message: "Not found movie",
            });
        }
        await userInfoService.addToFavorite(userId, movieId);

        return res.status(200).json({ message: "Added to favorite" });
    } catch (error) {
        return res.status(200).json({
            message: error.message,
        });
    }
}


exports.addToRecent = async (req, res) => {
    let userId = req.user._id;
    let movieId = req.params.id;
    await movieService.getMovieInfo(movieId).then(movie => {
        if (!movie) {
            return res.status(200).json({
                message: "Not found movie",
            })
        }
    });
    await userInfoService.addToRecent(userId, movieId).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Not found user",
            })
        }
        return res.status(200).json({ message: "Added to recent" });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.addToList = async (req, res) => {
    try {
        const userId = req.user._id;
        const movieId = req.params.id;
        const listName = req.params.name;

        const result = await userInfoService.addToList(userId, movieId, listName);

        if (result.success) {
            res.status(200).json({ message: "Added to list" });
        } else {
            res.status(200).json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createList = async (req, res) => {
    try {
        const userId = req.user._id;
        const listName = req.params.name;

        const result = await userInfoService.createList(userId, listName);

        if (result.success) {
            res.status(200).json({ message: "Created list" });
        } else {
            res.json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteList = async (req, res) => {
    let userId = req.user._id;
    let listName = req.params.name;
    await userInfoService.deleteList(userId, listName).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Not found user",
            })
        }
        return res.status(200).json({ message: "Deleted list" });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.deleteFromList = async (req, res) => {
    let userId = req.user._id;
    let movieId = req.params.id;
    let listName = req.params.name;
    await userInfoService.deleteFromList(userId, movieId, listName).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Not found user",
            })
        }
        return res.status(200).json({ message: "Deleted from list" });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.getListInfo = async (req, res) => {
    let userId = req.user._id;
    let listName = req.params.name;
    await userInfoService.getListInfo(userId, listName).then(list => {
        if (!list) {
            return res.status(200).json({
                message: "Not found list",
            })
        }
        return res.status(200).json({ message: "OK", list });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.deleteFromFavorite = async (req, res) => {
    let userId = req.user._id;
    let movieId = req.params.id;
    await userInfoService.deleteFromFavorite(userId, movieId).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Not found user",
            })
        }
        return res.status(200).json({ message: "Deleted from favorite" });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}

exports.deleteFromRecent = async (req, res) => {
    let userId = req.user._id;
    let movieId = req.params.id;
    await userInfoService.deleteFromRecent(userId, movieId).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Not found user",
            })
        }
        return res.status(200).json({ message: "Deleted from recent" });
    }).catch(error => {
        return res.json({
            message: error,
        })
    })
}