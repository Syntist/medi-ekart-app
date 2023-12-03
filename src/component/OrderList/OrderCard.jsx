import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Modal,
  Fade,
  Button,
  Box,
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { MEDOXER, PROVIDER } from "../../constant";
import { useLocation } from "react-router-dom";
import { approveOrder, rejectOrder } from "../../api/medoxer";
import { toast } from "react-toastify";

const OrderCard = ({ order, refetch }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const cardStyle = {
    maxWidth: 400,
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6">Order Details</Typography>
          <Typography>
            <strong>Order ID:</strong> {order._id}
          </Typography>
          <Typography>
            <strong>User ID:</strong> {order.userId}
          </Typography>
          <Typography>
            <strong>Status:</strong> {order.status}
          </Typography>
          {order.trackingNumber && (
            <Typography>
              <strong>Tracking Number:</strong> {order.trackingNumber}
            </Typography>
          )}
          {order.label &&
            user.type === MEDOXER &&
            pathname.includes(MEDOXER) && (
              <Typography>
                <strong>Label:</strong>{" "}
                <a href={order.label} target="_blank" rel="noreferrer">
                  Download
                </a>
              </Typography>
            )}
          <Typography>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </Typography>

          {order.prescriptionUrl && (
            <>
              <Divider style={{ margin: "10px 0" }} />
              <Typography>
                <strong>Prescription:</strong>{" "}
                {/* Render the prescription URL or image here */}
                <img
                  src={order.prescriptionUrl}
                  alt="Prescription"
                  style={{ maxWidth: "100%" }}
                />
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleOpenModal}
                >
                  Click to view
                </span>
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
            </>
          )}

          <Typography variant="h6">Medicines</Typography>
          {order.medicines.map((item) => (
            <div key={item._id}>
              <Typography>
                <strong>Medicine:</strong> {item.medicine.name}
              </Typography>
              <Typography>
                <strong>Quantity:</strong> {item.quantity}
              </Typography>
            </div>
          ))}
          <Divider style={{ margin: "10px 0" }} />

          <Typography>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </Typography>

          {user.type === MEDOXER && pathname.includes(MEDOXER) && (
            <>
              {order.status === "pending" && (
                <Box
                  pl={1}
                  pr={1}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() => {
                      approveOrder(order._id).then((res) => {
                        toast.success(`${res.data._id} has been Approved`);
                        refetch((prev) => !prev);
                      });
                    }}
                    variant="contained"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      rejectOrder(order._id).then((res) => {
                        toast.success(`${res.data._id} has been Rejected`);
                        refetch((prev) => !prev);
                      });
                    }}
                    color="error"
                    variant="contained"
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </>
          )}
        </CardContent>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Fade in={modalOpen}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={order.prescriptionUrl}
                alt="Prescription"
                style={{ maxWidth: "100%", maxHeight: "100vh" }}
              />
            </div>
          </Fade>
        </Modal>
      </Card>
    </Grid>
  );
};

export default OrderCard;
