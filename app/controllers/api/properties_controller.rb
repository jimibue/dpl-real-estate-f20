class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    render json: Property.page(@page).available
    # render json: Property.available
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
