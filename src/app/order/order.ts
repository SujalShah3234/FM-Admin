export class order {

  public constructor(
    public order_id: string,
    public order_amount: number,
    public order_date: Date,
    public fk_u_email_id: string,
    public payment_type: string,
  ) {}
}
