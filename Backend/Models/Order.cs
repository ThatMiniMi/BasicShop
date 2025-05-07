using System.Collections.ObjectModel;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDeate { get; set; }
    public int UserId { get; set; }
    public User? User {get; set; }
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}