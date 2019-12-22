class V1::ArticlesController < ApplicationController

  before_action :set_v1_article, only: [:show, :update, :destroy]

  # GET /v1/articles
  def index
    #@v1_articles = Article.all
    @v1_articles = Article.order('created_at DESC')

    render json: @v1_articles
  end

  # GET /v1/articles/1
  def show
    render json: @v1_article
  end

  # POST /v1/articles
  def create
    @v1_article = Article.new(v1_article_params)

    if @v1_article.save
      render json: @v1_article, status: :created
    else
      render json: @v1_article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/articles/1
  def update
    if @v1_article.update(v1_article_params)
      render json: @v1_article
    else
      render json: @v1_article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/articles/1
  def destroy
    @v1_article.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_article
      @v1_article = Article.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def v1_article_params
      #params.fetch(:v1_article, {}).permit(:title, :prix, :photo, :description)
      params.permit(:title, :price, :description, :avatar)
      #params.require(:v1_article).permit(:title, :prix, :photo, :description)
    end 
end
