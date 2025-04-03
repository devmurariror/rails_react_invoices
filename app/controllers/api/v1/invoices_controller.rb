class Api::V1::InvoicesController < ApplicationController
  include ApiResponse

  def index
    invoices = Invoice
      .joins(:company, check_invoices: :check)
      .select('invoices.number AS invoice_number, companies.name AS company_name, checks.number AS check_number')
      .order('invoices.created_at DESC')
    success_response(invoices)
  rescue StandardError => e
    error_response(e.message)
  end
end
