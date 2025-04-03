class Api::V1::CheckInvoicesController < ApplicationController
  before_action :set_company
  include ApiResponse

  def create
    ActiveRecord::Base.transaction do
      @check = @company.checks.create!(check_params)
      success_response(return_data)
    rescue StandardError => e
      error_response(e.message)
    end
  end

  private

  def return_data
    {
      company_name: @company.name,
      check_number: @check.number,
      invoices: @check.invoices.pluck(:number)
    }
  end

  def set_company
    @company = Company.find(params[:company_id])
  rescue StandardError => e
    error_response(e.message)
  end

  def check_params
    params.require(:check).permit(:number, :image_data).merge(
      invoices_attributes: format_invoices
    )
  end

  def format_invoices
    return [] unless params[:invoice_numbers].present?

    params[:invoice_numbers].split(",").map(&:strip).reject(&:empty?).map { |num| { number: num, company_id: @company.id } }
  end
end
