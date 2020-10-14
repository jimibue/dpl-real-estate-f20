class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    properties = Property.page(@page).available
    total_pages = properties.total_pages
    render json: { properties: properties, total_pages: total_pages }
    # render json: Property.available
  end

  def city
    # on frontend the properties would come back as res.data in the .then()
    # render json: Property.by_city(params[:city])

    properties = Property.page(@page).by_city(params[:city])
    total_pages = properties.total_pages

    # on frontend the properties would come back as res.data.properties and we would also res.data.total_pages in the .then()
    render json: { properties: properties, total_pages: total_pages }
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
