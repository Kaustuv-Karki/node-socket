import prisma from "../db/db.config";

class NewsController {
  static async getAllNews(req, res) {
    try {
      const news = await prisma.news.findMany();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "All news",
        data: news,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async createNews(req, res) {
    try {
      const user = req.user;
      const body = req.body;
      const news = await prisma.news.create({ data: body });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "News created successfully",
        data: news,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default NewsController;
