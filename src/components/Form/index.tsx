import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketType, BandData } from "../../types";
import { FormValues, formSchema } from "./types";
import { calcTotal, formatCost, getInitialState } from "./utils";

const TicketOption: React.FC<
  TicketType & { register: UseFormRegister<FormValues> }
> = ({ name, type, description, cost, register }) => {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 30 }}
      >
        <div>
          <span style={{ fontSize: "1.5rem" }}>{name.toUpperCase()}</span>
          <p>{description}</p>
          <div style={{ fontSize: "1.5rem" }}>{formatCost(cost)}</div>
        </div>
        <input
          type="number"
          min="0"
          style={{
            maxHeight: 40,
            maxWidth: 60,
            textAlign: "center",
            fontSize: "1.5rem",
          }}
          {...register(`cart.${type}.quantity`, { valueAsNumber: true })}
        ></input>
      </div>
      <hr style={{ marginTop: 20, marginBottom: 20 }} />
    </div>
  );
};

const baseInputStyle = {
  flexGrow: 1,
  fontSize: "1.25rem",
  padding: 10,
};

const Form: React.FC<{
  ticketTypes: BandData["ticketTypes"];
}> = ({ ticketTypes }) => {
  const {
    register,
    handleSubmit,
    watch,
    // TODO: handle validation errors
    // formState: { errors },
  } = useForm({
    defaultValues: getInitialState(ticketTypes),
    resolver: zodResolver(formSchema),
  });

  const cart = watch("cart");
  const total = calcTotal(cart);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitting form", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: "#f5f5f5",
        padding: 30,
        borderRadius: 5,
      }}
    >
      {/* Ticket options */}
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Select Tickets
      </div>
      {ticketTypes.map(({ name, type, description, cost }) => (
        <TicketOption
          key={type}
          name={name}
          type={type}
          description={description}
          cost={cost}
          register={register}
        />
      ))}

      {/* Total */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.5rem",
        }}
      >
        <span>TOTAL</span>
        <span>${total}</span>
      </div>

      {/* User info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          margin: "40px 0 40px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <input
            id="firstName"
            {...register("userData.firstName", { required: true })}
            placeholder="First Name"
            style={{
              ...baseInputStyle,
            }}
          />
          <input
            id="lastName"
            {...register("userData.lastName", {
              required: true,
            })}
            placeholder="Last Name"
            style={{
              ...baseInputStyle,
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <input
            id="address"
            {...register("userData.address", { required: true })}
            placeholder="Address"
            style={{ ...baseInputStyle }}
          />
        </div>
      </div>

      {/* Credit card info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          margin: "40px 0 40px 0",
        }}
      >
        <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          Payment Details
        </span>
        <div style={{ display: "flex" }}>
          <input
            id="cardNumber"
            {...register("userData.cardNumber", { required: true })}
            placeholder="0000 0000 0000 0000"
            style={{ ...baseInputStyle }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <input
            id="expiration"
            {...register("userData.expiration", { required: true })}
            placeholder="MM/YY"
            style={{ ...baseInputStyle }}
          />
          <input
            id="cvv"
            {...register("userData.cvv", { required: true })}
            placeholder="CVV"
            style={{ ...baseInputStyle }}
          />
        </div>
      </div>

      <button
        style={{
          width: "100%",
          fontSize: "1.25rem",
          padding: 10,
          backgroundColor: "#6c6c6c",
          border: "none",
          borderRadius: 5,
          color: "white",
          marginBottom: 20,
        }}
      >
        Get Tickets
      </button>
    </form>
  );
};

export default Form;
