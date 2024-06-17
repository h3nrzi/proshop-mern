export default interface UpdateOrderToPaidDto {
  id: string;
  payer: { email_address: string };
  status: string;
  update_time: string;
}
