class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    properties = Property.page(@page).available
    total_pages = properties.total_pages
    render json: { properties: properties, total_pages: total_pages }
    # render json: Property.available
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
