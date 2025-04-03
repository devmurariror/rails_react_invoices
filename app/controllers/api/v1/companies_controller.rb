class Api::V1::CompaniesController < ApplicationController
  include ApiResponse

  def index
    companies = Company.order('created_at DESC').select(:name, :id)
    success_response(companies)
  rescue StandardError => e
    error_response(e.message)
  end
end
